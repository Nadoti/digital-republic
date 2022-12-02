import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../../logo/Logo"

interface PropsListLinkOptions {
  id: number;
  url: string;
  link: string;
  classActive: string;
}

export function Aside({ urlRoutes }: string) {

  const userName = localStorage.getItem('userName')
  const navigate = useNavigate();

  const listLinkOptions: PropsListLinkOptions[] = [
    {
      id: 0,
      url: 'home',
      link: 'Home',
      classActive: '',
    },
    {
      id: 1,
      url: 'transferencia',
      link: 'Transferências',
      classActive: '',
    }
  ]

  function classNameActive(event: React.FormEvent) {
    const li = document.querySelectorAll('li')
    li.forEach((e) => {
      e.classList.remove('active')
    })
    event.currentTarget.className = `${event.currentTarget.className} active`
  }

  function activeClassNameReload(url: string) {
    const listUrl = listLinkOptions.filter(urlList => urlList.url === url)

    if (listUrl.length) {
      listUrl[0].classActive = 'active'
    }
  }

  function handleLogoff() {
    localStorage.removeItem('token')
    localStorage.removeItem('cpf')
    localStorage.removeItem('isLoggedIn')

    navigate('/')
  }

  activeClassNameReload(urlRoutes)

  return (
    <aside className="flex w-full flex-col items-center justify-between bg-zinc-900 py-10 px-0">
      <div className="flex flex-col w-full gap-8 items-center">
        <Logo />
        <div className="flex flex-col w-full items-center justify-center mt-8">
          <span className="text-lg text-primary">{userName}</span>
        </div>
        <nav className="w-full">
          <ul className="flex flex-col gap-5 items-center justify-center w-full">
            {listLinkOptions?.map(options => (
              <Link to={`${options.url}`} key={options.id} className="w-full">
                <li
                  className={`flex w-full items-center justify-center cursor-pointer relative text-lg font-mono font-bold text-zinc-500 transition-all ease-in-out py-4 px-0 hover:bg-primary-100 hover:text-black hover:after:content-[''] hover:after:w-[0.625rem] hover:after:h-full hover:after:bg-primary hover:after:absolute hover:after:top-0 hover:after:right-0 ${options.classActive === 'active' && 'bg-primary-100 text-black after:content-[""] after:w-[0.625rem] after:h-full after:bg-primary after:absolute after:top-0 after:right-0'}`}
                  onClick={classNameActive}
                >
                  {options.link}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="bg-zinc-700 py-4 px-16 rounded-lg font-bold text-gray-300 duration-200 ease-in-out hover:bg-gray-300 hover:text-zinc-700"
        onClick={handleLogoff}
      >
        Sair
      </button>
    </aside>
  )
}