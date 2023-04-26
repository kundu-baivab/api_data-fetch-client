import React, { useState, useEffect } from "react";

const City = () => {
  const [data, setData] = useState([]);
  const [averageIncome, setAverageIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api-data-fetch.onrender.com/getTopUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(
          data.data
            .sort(
              (a, b) =>
                Number(b.income.replace(/[^0-9.-]+/g, "")) -
                Number(a.income.replace(/[^0-9.-]+/g, ""))
            )
            .slice(0, 10)
        );
        setLoading(false);

        const users = data.data.sort(
          (a, b) =>
            Number(b.income.replace(/[^0-9.-]+/g, "")) -
            Number(a.income.replace(/[^0-9.-]+/g, ""))
        );

        const totalIncome = users.reduce((total, user) => {
          return total + Number(user.income.replace(/[^0-9.-]+/g, ""));
        }, 0);
        const avgIncome = totalIncome / users.length;
        setAverageIncome(avgIncome);
      });
  }, []);

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
  return (
    <>
      <h1 className="text-center my-3 font-weight-bold">
        TOP 10 CITY TABLE DEPENDING UPON USERS HAVING HIGHEST INCOME
      </h1>
      <div className="text-center">
        <button className="btn btn-dark">
          <a href="/" className="text-decoration-none text-light">
            Back to API TABLE
          </a>
        </button>
      </div>
      <h3 className="text-center my-5 font-weight-bold">
        Average Income of the following people : ${averageIncome}
      </h3>
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
          })}
        </tbody>
      </table>
    </>
  );
};

export default City;
