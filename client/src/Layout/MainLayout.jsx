import React, { useEffect, useState } from "react";
import { Divider, Grid, Layout } from "antd";

import MenuSider from "../components/Layout/MenuSider";
import Header from "../components/Layout/Header";
import Body from "../components/Layout/Body";
import OptionsSlider from "../components/Layout/OptionsSlider/OptionsSlider";

import "./MainLayout.less";

const { useBreakpoint } = Grid;

export default function MainLayout() {
  const { lg } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [optionSlider, setOptionSlider] = useState(true);
  const onCollapseSider = () => setCollapsed((prev) => !prev);
  const onOptionSliderChange = () => setOptionSlider((prev) => !prev);

  useEffect(() => {
    if (lg) setOptionSlider(true);
    else setOptionSlider(false);
  }, [lg]);

  return (
    <Layout hasSider className="main-layout">
      <MenuSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="body-layout">
        <Header
          onCollapseSider={onCollapseSider}
          onOptionSliderChange={onOptionSliderChange}
          collapsed={collapsed}
        />
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <Body />
      </Layout>
      <OptionsSlider optionSlider={optionSlider} />
    </Layout>
  );
}
