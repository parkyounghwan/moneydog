import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Row, Col, Layout, Button, Icon} from 'antd';
const { Footer } = Layout;

import App from '../shared/app';
import Head from '../component/all/Head';
import Foot from '../component/all/Foot';

import 'antd/dist/antd.less';
import '../static/style/total.css';
import '../static/style/footer.css';

const Root = () => (
    <BrowserRouter>
        <Row>
            <Col span={6}></Col>

            <Col span={12}>
              <Layout className="layout">

                <Head/>

                <App />

                <Foot/>

              </Layout>
            </Col>

            <Col span={6}></Col>
        </Row>
    </BrowserRouter>
);

export default Root;
