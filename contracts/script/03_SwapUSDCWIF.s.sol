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
    PoolSwapTest swapRouter = PoolSwapTest(0x9A8ca723F5dcCb7926D00B71deC55c2fEa1F50f7);

    address constant HRSK_ADDRESS = address(0x850f5c0b4EFb99442E877ec1D9D7210666ade441); //-- insert your own contract address here -- mUNI deployed to GOERLI
    address constant MUSDC_ADDRESS = address(0x663C1B5eAde9A851F7224f83ce593a51793Fb7F6); //-- insert your own contract address here -- mUSDC deployed to GOERLI
    address constant HOOK_ADDRESS = address(0x0); // hookless pool is 0x0!
    // address constant HOOK_ADDRESS = address(0xD2c827A074A3319b55493c4d5170100976317869); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant GOERLI_POOLMANAGER = address(0xFf34e285F8ED393E366046153e3C16484A4dD674); 

    // slippage tolerance to allow for unlimited price impact
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

    function run() external {
        address token0 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? MUSDC_ADDRESS : HRSK_ADDRESS;
        address token1 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? HRSK_ADDRESS : MUSDC_ADDRESS;
        uint24 swapFee = 10020;
        int24 tickSpacing = 10;

        // Using a hooked pool
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });
        uint160 startingPrice = 79228162514264337593543950336;
        // // // hookless pool doesnt expect any initialization data
        vm.broadcast();
        IPoolManager manager = IPoolManager(GOERLI_POOLMANAGER);
        bytes memory hookData = new bytes(0);
        manager.initialize(pool, startingPrice, hookData);

        // approve tokens to the swap router
        vm.broadcast();
        IERC20(token0).approve(address(swapRouter), type(uint256).max);
        vm.broadcast();
        IERC20(token1).approve(address(swapRouter), type(uint256).max);

        // ---------------------------- //
        // Swap 100e18 token0 into token1 //
        // ---------------------------- //
        bool zeroForOne = false;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: 10000,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });

        // in v4, users have the option to receieve native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        console.log("zeroForOne:", params.zeroForOne);
        // console.log("amountSpecified:", params.amountSpecified);
        console.log("sqrtPriceLimitX96:", params.sqrtPriceLimitX96);

        // bytes memory hookData = new bytes(0);
        vm.broadcast();
        swapRouter.swap(pool, params, testSettings, hookData);
        // vm.stopBroadcast();
    }
}


// forge create script/03_Swap.s.sol:SwapScript --rpc-url https://eth-sepolia.g.alchemy.com/v2/DEpM0iuqFx6OIfg_4zUg7ifHA2m7ESRo --private-key 2f51c0cf04c52067f15a5cd8a621507a274b80239359e6203d1c5cd1186dfbb8 