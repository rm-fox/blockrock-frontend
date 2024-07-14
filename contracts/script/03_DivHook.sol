// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {BaseHook} from "v4-periphery/BaseHook.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {BalanceDelta} from "@uniswap/v4-core/contracts/types/BalanceDelta.sol";
import {IHookFeeManager} from "@uniswap/v4-core/contracts/interfaces/IHookFeeManager.sol";
import {IDynamicFeeManager} from "@uniswap/v4-core/contracts/interfaces/IDynamicFeeManager.sol";

contract Counter is BaseHook, IHookDivManager, IDynamicFeeManager {
    using PoolIdLibrary for PoolKey;

    // NOTE: ---------------------------------------------------------
    // state variables should typically be unique to a pool
    // a single hook contract should be able to service multiple pools
    // ---------------------------------------------------------------
    // Two variables to tracking hook fees
    uint256 private startFee0;
    uint256 private startFee1;

    struct Fees {
        uint128 fee0;
        uint128 fee1;
    }

    //We base the dividend amount on the amount of fees the person has paid, rather than time and the percentrage of 
    //their overall fees to be paid out as div is set per pool hook initiation

    uint24 public immutable DIV_PERCENTAGE;
    mapping(uint256 => mapping(address => uint256)) public poolDividends;
    mapping(uint256 => address[]) public dividendMembers;
    mapping(uint256 => uint256) public ;

    constructor(IPoolManager _poolManager, uint24 _div_amt) BaseHook(_poolManager) {
        DIV_PERCENTAGE = _div_percentage;
    }

    function getHooksCalls() public pure override returns (Hooks.Calls memory) {
        return Hooks.Calls({
            beforeInitialize: false,
            afterInitialize: false,
            beforeModifyPosition: true,
            afterModifyPosition: true,
            beforeSwap: true,
            afterSwap: true,
            beforeDonate: false,
            afterDonate: false
        });
    }

    // Getting the member fee portion
    function getDividend(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params, bytes calldata data)
        external
        returns (uint24)
    {
        if (ref == bytes32(0) || dividendMembers[ref] == address(0)) return 0; #
        else return poolDividends[poolId][ref];
    }
    // -----------------------------------------------
    // NOTE: see IHooks.sol for function documentation
    // -----------------------------------------------

    // Updating the fee depending on the holding currency

    function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata, bytes calldata)
        external
        override
        returns (bytes4)
    {
        if (params.zeroForOne) {
            startFee0 = poolManager.hookFeesAccrued(address(key.hooks), key.currency0);
        } else {
            startFee1 = poolManager.hookFeesAccrued(address(key.hooks), key.currency1);
        }
        return BaseHook.beforeSwap.selector;
    }

    //paying Divs above a threshold 

    function afterSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        BalanceDelta,
        bytes calldata ref
    ) external override returns (bytes4) {
        PoolId id = key.toId();
        Fees fee = new Fees();
        if (ref == address(0) || dividendMembers[ref] == address(0)) return BaseHook.afterSwap.selector;
        if (params.zeroForOne) {
            fee.fee0 = poolManager.hookFeesAccrued(address(key.hooks), key.currency0);
        } else {
            fee.fee1 = poolManager.hookFeesAccrued(address(key.hooks), key.currency1);
        }
        // Check if the fee is above the threshold
        if (params.zeroForOne && fee.fee0 > thresholdDivs[id]) {
            poolDividends[ref][id] = fee.fee0 * DIV_PERCENTAGE; // paid out
        } else  {
            poolDividends[ref][id] = 0; 
        }
        return BaseHook.afterSwap.selector;
    }
}

    function beforeModifyPosition(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyPositionParams calldata,
        bytes calldata
    ) external override returns (bytes4) {
        startFee0 = poolManager.hookFeesAccrued(address(key.hooks), key.currency0);

        startFee1 = poolManager.hookFeesAccrued(address(key.hooks), key.currency1);

        return BaseHook.beforeModifyPosition.selector;
    }

    // Updating 

    function afterModifyPosition(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyPositionParams calldata,
        BalanceDelta,
        bytes calldata
    ) external override returns (bytes4) {
        // Updating fees
        Fees fee = new Fees();
        PoolId id = key.toId();

        uint256 hookFee0 = poolManager.hookFeesAccrued(address(key.hooks), key.currency0);
        fees.fee0 == uint128(hookfee0);

        uint256 hookFee1 = poolManager.hookFeesAccrued(address(key.hooks), key.currency1);
        fees.fee1 == uint128(hookfee1);

        return BaseHook.afterModifyPosition.selector;
    }

    function generateDiv(bytes32 divPool) external returns (bytes32 code) {
        require(investors[divPool] == address(0), "div already set");
        if (divPool == bytes32(0)) code = bytes32(msg.sender);
        else code = divPool;
    }

    function updateDivMember(bytes32 divPool, address newDivMember) external {
        if (dividendMembers[id] != msg.sender) revert("Not eligible");
        dividendMembers[id] = newDivMember;
    }

    function claimDivs(bytes32 divPool, PoolId id, Currency[] calldata currencies) external {
        Fees _fee = poolDividends[ref][id];
        poolManager.collectHookFees(address(0), currencies[0], _fee.fee0);
        poolManager.collectHookFees(address(0), currencies[1], _fee.fee1);
    }


