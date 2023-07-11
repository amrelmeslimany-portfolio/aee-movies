import { Col, Row } from "antd";
import React from "react";
import MovieTrend from "../Movies/MovieTrend";

function CategoriesList({ items }) {
  return (
    <Row gutter={15}>
      {items.map((item) => (
        <Col
          key={item._id}
          xxl={{ span: 6 }}
          xl={{ span: 8 }}
          md={{ span: 12 }}
        >
          <MovieTrend data={item} isLazy={false} className="normal-dimations" />
        </Col>
      ))}
    </Row>
  );
}

export default CategoriesList;
