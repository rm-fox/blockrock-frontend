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
    PoolSwapTest swapRouter = PoolSwapTest(0x9A8ca723F5dcCb7926D00B71deC55c2fEa1F50f7);

    address constant MUSDC_ADDRESS = address(0x856Fe341c855243fe6947d9053621be728a5ec22); 
    address constant WIF_ADDRESS = address(0x663C1B5eAde9A851F7224f83ce593a51793Fb7F6);

    // mUSDC for MOON (0x850f5c0b4EFb99442E877ec1D9D7210666ade441) swap in HOOK contract
    address constant HOOK_ADDRESS = address(0xD2c827A074A3319b55493c4d5170100976317869); 

    // slippage tolerance to allow for unlimited price impact
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 0;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

    function run() external {
        address token0 = uint160(MUSDC_ADDRESS) < uint160(WIF_ADDRESS) ? MUSDC_ADDRESS : WIF_ADDRESS;
        address token1 = uint160(MUSDC_ADDRESS) < uint160(WIF_ADDRESS) ? WIF_ADDRESS : MUSDC_ADDRESS;
        uint24 swapFee = 0;
        int24 tickSpacing = 10;

        // Using a hooked pool
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });
        bytes memory hookData = new bytes(0);

        vm.broadcast();
        IERC20(token0).approve(address(swapRouter), type(uint256).max);
        vm.broadcast();
        IERC20(token1).approve(address(swapRouter), type(uint256).max);

        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: 10000,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT 
        });


        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        // bytes memory hookData = new bytes(0);
        vm.broadcast();
        swapRouter.swap(pool, params, testSettings, hookData);
        // vm.stopBroadcast();
    }
}


