import { SignOutButton, UserButton } from "@clerk/clerk-react"
import { FaShoppingCart } from "react-icons/fa"
import {Link} from "react-router-dom"
const Header = () => {
    return (
        <div>
            <div className="h-16  bg-black">
                <div className="flex items-center h-16 px-4 justify-between">
                    <div>
                        <span className="text-2xl font-bold text-yellow-300">Ecommerce</span>
                    </div>

                    <div className="flex items-center gap-3 ">
                        <div className="text-white text-2xl "><Link to={"/cart"}><FaShoppingCart></FaShoppingCart></Link></div>
                        <UserButton></UserButton>
                        <div className=" bg-yellow-300 py-1 px-2 rounded-full font-bold">
                            <SignOutButton></SignOutButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
