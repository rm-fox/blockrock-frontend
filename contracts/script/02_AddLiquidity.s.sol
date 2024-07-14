// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolModifyLiquidityTest} from "v4-core/src/test/PoolModifyLiquidityTest.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";

contract AddLiquidityScript is Script {
    using CurrencyLibrary for Currency;

    address constant GOERLI_POOLMANAGER = address(0xFf34e285F8ED393E366046153e3C16484A4dD674); // pool manager deployed to GOERLI
    address constant HRSK_ADDRESS = address(0x850f5c0b4EFb99442E877ec1D9D7210666ade441); // mUNI deployed to GOERLI -- insert your own contract address here
    address constant MUSDC_ADDRESS = address(0x856Fe341c855243fe6947d9053621be728a5ec22); // mUSDC deployed to GOERLI -- insert your own contract address here
    address constant HOOK_ADDRESS = address(0x0); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    PoolModifyLiquidityTest lpRouter = PoolModifyLiquidityTest(address(0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317));

    function run() external {
        // sort the tokens!
        address token0 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? MUSDC_ADDRESS : HRSK_ADDRESS;
        address token1 = uint160(MUSDC_ADDRESS) < uint160(HRSK_ADDRESS) ? HRSK_ADDRESS : MUSDC_ADDRESS;
        uint24 swapFee = 4000; // 0.04% fee tier
        int24 tickSpacing = 10;

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });
        // uint160 startingPrice = 79228162514264337593543950336;

        // hookless pool doesnt expect any initialization data
        // vm.broadcast();
        // IPoolManager manager = IPoolManager(GOERLI_POOLMANAGER);
        bytes memory hookData = new bytes(0);
        // manager.initialize(pool, startingPrice, hookData);

        // approve tokens to the LP Router
        vm.broadcast();
        IERC20(token0).approve(address(lpRouter), 1000e18);
        vm.broadcast();
        IERC20(token1).approve(address(lpRouter), 1000e18);

        // optionally specify hookData if the hook depends on arbitrary data for liquidity modification
        // bytes memory hookData = new bytes(0);

        // logging the pool ID
        PoolId id = PoolIdLibrary.toId(pool);
        bytes32 idBytes = PoolId.unwrap(id);
        console.log("Pool ID Below");
        console.logBytes32(bytes32(idBytes));

        // Provide 10_000e18 worth of liquidity on the range of [-600, 600]
        vm.startBroadcast();
        lpRouter.modifyLiquidity(pool, IPoolManager.ModifyLiquidityParams(-600, 600, 10_000e18, 0), hookData);
        vm.stopBroadcast();
    }
}
