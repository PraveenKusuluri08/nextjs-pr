// import classNames from "classNamenames"
"use client"
import { ChatWindowIcon, BudgetIcon, CollapseIcon } from "@/components/icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const AuthNavbar = () => {
  const router = useRouter()
  const pathName = usePathname()
  console.log(pathName.slice(1))
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img
            src="/logo.png"
            className="h-10 mr-3"
            alt="Expenses Tacker and Budgeting"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        {/* <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button> */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className="border-2 px-2 py-2 border-solid">
              <a
                href={`/`}
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
              >
                Home
              </a>
            </li>
            <li className="border-2 border-blue-500 px-2 py-2">
              <a
                href={`${pathName === "/signup" ? "/signup" : "/signin"}`}
                className="block py-2 pl-3 pr-4 font-extrabold text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {" "}
                  {pathName.slice(1)[0].toUpperCase() + pathName.slice(2)}
                </span>
              </a>
            </li>
            <li className="border-2 px-2 py-2 border-solid">
              <a
                href={`${pathName === "/signup" ? "/signin" : "/signup"}`}
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
              >
                {pathName === "/signup" ? "Signin" : "Signup"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AuthNavbar
