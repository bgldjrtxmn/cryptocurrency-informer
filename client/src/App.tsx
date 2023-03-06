import 'antd/dist/reset.css';
import {Button, message, Table} from "antd";
import './app.css'
import React, {useCallback, useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isParseLoading, setParseLoading] = useState(false);


    const fetch = useCallback(async () => {
        try {
            setLoading(true);

            let response = await axios.get('http://localhost:3000/show')

            setData(response.data)
            message.success('Данные успешно загружены')
        } catch (e) {
            console.log('fetch', e);
        } finally {
            setLoading(false);
        }
    },[])

    const parse = useCallback(async () => {
        try {
            setParseLoading(true);
            await axios.get('http://localhost:3000/parse')
            message.success('Данные успешно обновлены')
        } catch (e) {
            console.log('parse', e);
        } finally {
            setParseLoading(false);
        }
    },[])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Валюта',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Значение',
            dataIndex: 'percentage',
            key: 'percentage',
        },
    ];

  return (
      <div className="main">
          <div className="filters">
              <Button type="primary" onClick={parse} disabled={isParseLoading}>Parse</Button>
              <Button onClick={fetch} disabled={isLoading}>Show</Button>
          </div>
          <Table className="table" dataSource={data} columns={columns} loading={isLoading}/>
      </div>
  )
}

export default App
