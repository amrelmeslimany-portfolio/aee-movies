import { Divider, Typography } from "antd";
import "./InfoTag.less";

function InfoTag({ label, title }) {
  return (
    <li className="tag-item">
      <Typography.Text className="tag-label">{label}</Typography.Text>
      <Divider />
      <Typography.Text className="tag-title" strong>
        {title}
      </Typography.Text>
    </li>
  );
}

export default InfoTag;
