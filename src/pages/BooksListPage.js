import React, { useEffect, useState } from "react";
import BookListSideBar from "../components/BookListSideBar";
import ratingStar from "../data/ratingStar.svg";
import searchIcon from "../data/searchIcon.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import Header from "../components/Header";
import Footer from "../components/Footer";


const BooksListPage = () => {
  const [isLoading, setisLoading] = useState(true);
  const [bookDatas, setBookDatas] = useState({});
  const [currentBookshelves,setCurrentBookshelve] = useState('ALL')
  const [searchText, setSearchText] = useState("");
  const [search,setSearch] = useState('');

  const bookshelvesList = [
    {
      id: '22526c8e-680e-4419-a041-b05cc239ece4',
      value: 'ALL',
      label: 'All',
    },
    {
      id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
      value: 'READ',
      label: 'Read',
    },
    {
      id: '2ab42512-3d05-4fba-8191-5122175b154e',
      value: 'CURRENTLY_READING',
      label: 'Currently Reading',
    },
    {
      id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
      value: 'WANT_TO_READ',
      label: 'Want to Read',
    },
  ];
  const apiHandler = async () => {
    const bookFetchUrl = `https://apis.ccbp.in/book-hub/books?shelf=${currentBookshelves}&search=${search}`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const responseData = await fetch(bookFetchUrl, options);
    if (responseData.ok === true) {
      const res = await responseData.json();
      setBookDatas(res);
      setisLoading(false);
    }
  };
  useEffect(() => {
    apiHandler();
  }, [currentBookshelves,search]);
  const searchsubmitHandler = (event) => {
    event.preventDefault();
    setSearch (searchText)
  };
  return (
    <div>
      <Header />
      <div className="bg-[#F5F7FA]">
        <div className="mx-[24px] flex flex-col md:flex-row md:justify-start md:items-start md:space-x-[32px] md:mx-[50px] lg:mx-[150px]">
          <div className="md:hidden mb-[16px] h-[36px] w-[264px] border border-[#CBD5E1] bg-[#FFFFFF] rounded-[4px]">
            <form onSubmit={searchsubmitHandler}>
              <div className="flex flex-row justify-start items-center">
                <input
                  type="text"
                  placeholder="search"
                  className="block my-[6px] ml-[16px] h-[24px] focus:ring-0 focus:outline-0"
                  onChange={(e) => setSearchText(e.target.value.trim())}
                />
                <button
                  type="submit"
                  className=" w-[52px] h-[34px] flex justify-center items-center bg-[#EDEFF1] rounded-l-[2px]"
                >
                  <img
                    src={searchIcon}
                    className="w-[20px] h-[20px] opacity-60 "
                    alt="search"
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="mb-[24px] md:mb-0">

                <div className='md:p-[32px] md:min-w-[256px] md:w-[256px] md:max-w-[256px]'>
                  <h1 className='text-[#334155] text-[20px] font-semibold leading-[32px] mb-[16px]'>
                    Bookshelves
                  </h1>
                  <div className='flex flex-row flex-wrap whitespace-nowrap md:flex-col md:space-y-[12px] max-[441px]:[&>*:last-child]:mt-4'>
                  {
                    bookshelvesList.map((item)=>(
                    <button type="button" className={` text-[12px] text-center leading-[16px] px-[16px] py-[4px]  border border-[#0284C7] rounded-full mr-[12px]  md:text-[16px] md:text-left  md:leading-[24px] md:p-0 md:border-0 md:rounded-none md:mr-0    ${item.value === currentBookshelves ? 'text-[#F8FAFC] bg-[#0284C7] md:text-[#0284C7] md:bg-[#F5F7FA] md:font-semibold' : 'text-[#0284C7] md:text-[#475569] font-normal ' }`} onClick={()=>setCurrentBookshelve(item.value)}  key={item.id}>{item.label}</button>
                  ))}
                    </div>        
                </div>
              
          </div>
          <div>
            <div className="hidden md:flex flex-row justify-between items-center mb-[24px]">
              <p className="">All Book</p>
              <div className="h-[36px] w-[264px] border border-[#CBD5E1] bg-[#FFFFFF] rounded-[4px]">
                <form onSubmit={searchsubmitHandler}>
                  <div className="flex flex-row justify-start items-center">
                    <input
                      type="text"
                      placeholder="search"
                      className="block my-[6px] ml-[16px] h-[24px] focus:ring-0 focus:outline-0"
                      onChange={(e) => setSearchText(e.target.value.trim())}
                    />
                    <button
                      type="submit"
                      className=" w-[52px] h-[34px] flex justify-center items-center bg-[#EDEFF1] rounded-l-[2px]"
                    >
                      <img
                        src={searchIcon}
                        className="w-[20px] h-[20px] opacity-60 "
                        alt="search"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[136px] gap-y-[24px]">
                {isLoading ? (
                  <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
                    <ReactLoading type="spin" color="#0284C7" />
                  </div>
                ) : bookDatas !== undefined ? (
                  bookDatas.books.map((book) => (
                    <li key={book.id}>
                      <Link
                        to={`/BookDetailPage/${book.id}`}
                        className="flex flex-row justify-start items-center space-x-[16px] md:items-start md:space-x-[20px] "
                      >
                        <div className="w-[133px] h-[155px] min-w-[133px] min-h-[155px] rounded-[8px]">
                          <img
                            src={book.cover_pic}
                            className="w-full h-full bg-gray-200 object-cover rounded-[8px] "
                            alt="books"
                          />
                        </div>
                        <div className="w-full md:max-w-[152px] flex flex-col space-y-[8px]">
                          <h2 className="text-[#334155] text-[16px] font-semibold leading-[24px] max-w-[152px] breake-words">
                            {book.title}
                          </h2>
                          <p className="text-[#475569] text-[14px] font-medium leading-[16px]">
                            {book.author_name}
                          </p>
                          <div className="flex flex-row items-center justify-start">
                            <span className="text-[#475569] text-[12px] font-medium leading-[16px] mr-[4px]">
                              Avg Rating
                            </span>
                            <span className="w-[16px] h-[16px] max-w-[16px] max-h-[16px] mr-[4px]">
                              <img
                                src={ratingStar}
                                className=""
                                width="16px"
                                height="16px"
                              />
                            </span>
                            <span className="text-[#334155] text-[14px] font-normal leading-[14px] ">
                              {book.rating}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#475569] text-[12px] font-medium leading-[16px] mr-[4px]">
                              Status :
                            </span>
                            <span className="text-[#0284C7] text-[12px] font-medium leading-[16px]">
                              {book.read_status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
                    <p>No books found</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BooksListPage;
