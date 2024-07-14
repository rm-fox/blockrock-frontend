// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolManager} from "v4-core/src/PoolManager.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {PoolId} from "v4-core/src/types/PoolId.sol";

contract PoolInitializeExampleInputs is Script {
    using CurrencyLibrary for Currency;

    address constant GOERLI_POOLMANAGER = address(0xFf34e285F8ED393E366046153e3C16484A4dD674); // pool manager deployed to GOERLI
    address constant HRSK_ADDRESS = address(0x850f5c0b4EFb99442E877ec1D9D7210666ade441); // mUNI deployed to GOERLI -- insert your own contract address here
    address constant MUSDC_ADDRESS = address(0x663C1B5eAde9A851F7224f83ce593a51793Fb7F6); // mUSDC deployed to GOERLI -- insert your own contract address here
    address constant HOOK_ADDRESS = address(0x0); // hookless pool is 0x0!

    IPoolManager manager = IPoolManager(GOERLI_POOLMANAGER);

    event Initialize(
        PoolId indexed id,
        Currency indexed currency0,
        Currency indexed currency1,
        uint24 fee,
        int24 tickSpacing,
        IHooks hooks
    );

    function run() external {
        address token0 = address(MUSDC_ADDRESS);
        address token1 = address(HRSK_ADDRESS);
        uint24 swapFee = 0; // 0.05% fee tier
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 79228162514264337593543950336;

        // hookless pool doesnt expect any initialization data
        bytes memory hookData = new bytes(0);

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(HOOK_ADDRESS)) // 0x0 is the hookless pool
        });

        vm.startBroadcast();
        manager.initialize(pool, startingPrice, hookData);
        vm.stopBroadcast();
    }
}
