// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";

contract SwapScript is Script {
    // PoolSwapTest Contract address on Goerli
    PoolSwapTest swapRouter = PoolSwapTest(0xD2c827A074A3319b55493c4d5170100976317869);

    address constant HRSK_ADDRESS = address(0x850f5c0b4EFb99442E877ec1D9D7210666ade441); //-- insert your own contract address here -- mUNI deployed to GOERLI
    address constant MUSDC_ADDRESS = address(0x856Fe341c855243fe6947d9053621be728a5ec22); //-- insert your own contract address here -- mUSDC deployed to GOERLI
    address constant HOOK_ADDRESS = address(0x0); // hookless pool is 0x0!
    // address constant HOOK_ADDRESS = address(0xD2c827A074A3319b55493c4d5170100976317869); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    // slippage tolerance to allow for unlimited price impact
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

    function run() external {
        address token0 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? MUSDC_ADDRESS : HRSK_ADDRESS;
        address token1 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? HRSK_ADDRESS : MUSDC_ADDRESS;
        uint24 swapFee = 4000;
        int24 tickSpacing = 10;

        // Using a hooked pool
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });

        // approve tokens to the swap router
        console.log("Approving token0:", token0);
        vm.broadcast();
        IERC20(token0).approve(address(swapRouter), type(uint256).max);

        console.log("Approving token1:", token1);
        vm.broadcast();
        IERC20(token1).approve(address(swapRouter), type(uint256).max);

        // Check balances before swap
        console.log("Token0 balance before swap:", IERC20(token0).balanceOf(address(this)));
        console.log("Token1 balance before swap:", IERC20(token1).balanceOf(address(this)));

        // ---------------------------- //
        // Swap 1000 units of token0 into token1 //
        // ---------------------------- //
        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: 1000,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });

        // in v4, users have the option to receieve native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0);
        console.log("Executing swap...");
        vm.broadcast();
        swapRouter.swap(pool, params, testSettings, hookData);

        // Check balances after swap
        console.log("Token0 balance after swap:", IERC20(token0).balanceOf(address(this)));
        console.log("Token1 balance after swap:", IERC20(token1).balanceOf(address(this)));
    }
}
