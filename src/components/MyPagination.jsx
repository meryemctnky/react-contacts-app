import React, { useEffect, useState, useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { ContactContext } from "../contexts/ContactContext";

const MyPagination = ( {pages, setCurrentPage, contactPerPage}) => {
  const { contactsLength } = useContext(ContactContext);
  const [current, setCurrent] = useState(1)

  const numOfPages = [];

  for (let i=1; i <= pages; i++) {
    numOfPages.push(i)
  }

  useEffect(() => {
    setCurrentPage(current)
  }, [current,setCurrentPage ])

  return (
        <div className="row">
          <div className="col-sm-6">
            <div className="hint-text text-white">Showing <b>{contactPerPage}</b> out of <b>{contactsLength}</b> entries</div>
          </div>
          <div className="col-sm-6">
            <div className="row float-end">
              <Pagination className="pagination">
                <Pagination.Item className={`${current === 1 ? "disabled" : "page-item"}`} onClick={() => setCurrent((prev) => prev ===1 ? prev : prev-1)}>Previous</Pagination.Item>
                {
                  numOfPages.map((page, index) => {
                    return (
                      <Pagination.Item 
                        key={index} 
                        className={`${current === page ? "active" : "page-item"}`}
                        onClick={() => setCurrent(page)}>{page}
                      </Pagination.Item>
                    )
                  })
                }
                <Pagination.Item className={`${current === numOfPages.length ? "disabled" : "page-item"}`} onClick={() => setCurrent((prev) => prev === numOfPages.length ? prev : prev+1)}>Next</Pagination.Item>
              </Pagination>
            </div>
          </div>
      </div>
  );
};

export default MyPagination;



