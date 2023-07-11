import { Col, Row } from "antd";
import SearchedMovie from "../Movies/SearchedMovie";

function GridList({ list, removeble }) {
  return (
    <Row gutter={10}>
      {list.map((item) => (
        <Col key={item._id} span={12}>
          <SearchedMovie data={item} removeble={removeble} />
        </Col>
      ))}
    </Row>
  );
}

export default GridList;
