import React, { useState } from "react";
import { Divider, Layout } from "antd";

import MenuSider from "../components/Layout/MenuSider";
import Header from "../components/Layout/Header";
import Body from "../components/Layout/Body";
import OptionsSlider from "../components/Layout/OptionsSlider/OptionsSlider";

import "./MainLayout.less";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapseSider = () => setCollapsed((prev) => !prev);
  return (
    <Layout hasSider className="main-layout">
      <MenuSider collapsed={collapsed} />
      <Layout className="body-layout">
        <Header onCollapseSider={onCollapseSider} collapsed={collapsed} />
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <Body />
      </Layout>
      <OptionsSlider />
    </Layout>
  );
}
