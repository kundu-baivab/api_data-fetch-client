import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8005/getAllUser?page=${currentPage}&limit=${10}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
    return (
      <div class="loading">
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
      </div>
    );
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <h1 className="text-center my-3 font-weight-bold">
        API TABLE INCLUDING ALL SPECIFICATIONS GIVEN
      </h1>
      <div className="text-center">
        <button className="btn btn-dark">
          <a href="/cities" className="text-decoration-none text-light">
            City Table
          </a>
        </button>
      </div>
      <div className="pagination d-flex justify-content-center align-items-center my-3">
        <button
          className="btn btn-dark changebtn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="no">{`${currentPage} of ${totalPages}`}</span>
        <button
          className="btn btn-dark changebtn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Income</th>
            <th>City</th>
            <th>Car</th>
            <th>Quote</th>
            <th>Phone price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            var currency = d.income;
            var income = Number(currency.replace(/[^0-9.-]+/g, ""));
            var money = d.phone_price;
            var price = Number(money.replace(/[^0-9.-]+/g, ""));
            if (
              (income < 5.0 &&
                (d.car === "BMW" || d.car === "Mercedes-Benz")) ||
                (d.gender === "Male" && price > 10000) ||
                (d.last_name.substring(0, 1) === "M" &&
                    d.quote.length > 15 &&
                    d.email.includes(`${d.last_name.toLowerCase()}`)) ||
                ((d.car === "BMW" ||
                    d.car === "Mercedes-Benz" ||
                    d.car === "Audi") &&
                    !/\d/.test(d.email))
            ) {
              return (
                <tr>
                  <td>{d.id}</td>
                  <td>{d.first_name}</td>
                  <td>{d.last_name}</td>
                  <td>{d.email}</td>
                  <td>{d.gender}</td>
                  <td>{d.income}</td>
                  <td>{d.city}</td>
                  <td>{d.car}</td>
                  <td>{d.quote}</td>
                  <td>{d.phone_price}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
