import { ethers } from 'ethers';
const Items = [
    {
        id:1,
        price : ethers.utils.parseEther('100')
    },
    {
        id:1,
        price : ethers.utils.parseEther('200')
    }
]

const Store = ({paymentProcessor, WETHAbi, account}) => {
    const buy = async (item)=>{
        console.log(paymentProcessor, WETHAbi, account);
        const tx1= await WETHAbi.approve(paymentProcessor, item.price);
        await tx1.wait();
    }
    return (
        <ul>
            <li>
                Buy Item1 <span>100 WETH</span>
                <button type='button' onClick={()=>{
                    buy(Items[0])
                }}>Buy</button>
            </li>
            <li>
                Buy Item2 <span>200 WETH</span>
                <button type='button' onClick={()=>{
                    buy(Items[1])
                }}>Buy</button>
                
            </li>
        </ul>
    )
}

export default Store;