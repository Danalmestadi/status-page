export function Footer() {
return(
    
<footer className="bg-white rounded-lg shadow m-4 dark:bg-Netural-100 text-sm">
  <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    <span className="text-gray-500 sm:text-center dark:text-gray-400">
      © 2023 <a href="https://www.tamkeentech.sa/en" className="hover:underline">Tamkeen technologies</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a href="#" className="mr-2 hover:underline md:mr-4">About</a>
      </li>
      <li>
        <a href="#" className="mr-2 hover:underline md:mr-4">Privacy Policy</a>
      </li>
      <li>
        <a href="#" className="mr-2 hover:underline md:mr-4">Licensing</a>
      </li>
      <li>
        <a href="#" className="hover:underline">Contact</a>
      </li>
    </ul>
  </div>
</footer>

);


}