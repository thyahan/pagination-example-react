import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import Pagination from "react-js-pagination";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const { Meta } = Card;

const getImgUrl = id => {
  return `https://i.picsum.photos/id/${id}/600/400.jpg`;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const makeMockup = () => {
      const arr = [...Array(100)];
      const mockupItems = arr.map((ar, index) => {
        return {
          src: getImgUrl(index + 1),
          title: index + 1
        };
      });
      setItems(mockupItems);
    };

    makeMockup();
  }, []);

  const renderCard = start => {
    const itemToRenders = items.slice(start * 5 - 5, start * 5);
    return itemToRenders.map(({ src, title }, index) => {
      return (
        <Card
          key={src}
          hoverable
          style={{ width: "400px", marginBottom: "12px" }}
          cover={<img alt="example" src={src} />}
        >
          <Meta title={title} description={src} />
        </Card>
      );
    });
  };

  const renderPagination = () => {
    return (
      <div>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={5}
          totalItemsCount={100}
          pageRangeDisplayed={5}
          onChange={page => {
            console.log(page, "page");
            setCurrentPage(page);
          }}
        />
      </div>
    );
  };

  return (
    <div className="App">
      {renderCard(currentPage)}
      <Divider />
      {renderPagination()}
    </div>
  );
};

export default App;
