import React, { useEffect, useState, useMemo } from 'react';
import { Container, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { confirmAlert } from 'react-confirm-alert';
import Moment from 'react-moment';
import CanvasJSReact from './assets/js/canvasjs.react';

import UserContactable from './components/user-contact-table';
import ApiService from './services/Api.service';
import deleteIcon from './assets/delete.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const { CanvasJSChart } = CanvasJSReact;

if (typeof window !== 'undefined') {
  injectStyle();
}

const App = () => {
  const totalUsers = 200;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open] = useState('1');
  const [countryData, setCountryData] = useState([]);
  const toggle = () => {};

  const chartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: '',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: countryData,
      },
    ],
  };

  const columns = useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: (row) => `${row.name.first} ${row.name.last}`,
        Cell: (cellProps) => {
          return `${cellProps.row.original.name.first} ${cellProps.row.original.name.last}`;
        },
      },
      {
        Header: 'Location',
        accessor: (row) => `${row.location.city} ${row.location.country}`,
        Cell: (cellProps) => {
          return `${cellProps.row.original.location.city}, ${cellProps.row.original.location.country}`;
        },
      },
      {
        Header: 'Registered',
        accessor: 'registered.date',
        Cell: (cellProps) => {
          return <Moment format="MM/DD/YYYY">{cellProps.row.original.registered.date}</Moment>;
        },
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        disableSortBy: true,
      },
      {
        Header: 'Picture',
        accessor: 'picture.thumbnail',
        Cell: (cellProps) => {
          return (
            <img
              src={`${cellProps.row.original.picture.thumbnail}`}
              alt={`${cellProps.row.original.name.first} ${cellProps.row.original.name.last}`}
            />
          );
        },
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Actions',
        id: 'delete',
        accessor: () => 'delete',
        Cell: (cellProps) => (
          <div
            role="presentation"
            className="delete-icon-container"
            onClick={() => {
              confirmAlert({
                title: 'Delete',
                message: 'Are you sure you want to remove this user?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                      const dataCopy = [...users];
                      dataCopy.splice(cellProps.row.index, 1);
                      setUsers(dataCopy);
                      toast.success('User removed successfully.');
                    },
                  },
                  {
                    label: 'No',
                  },
                ],
              });
            }}
          >
            <img src={deleteIcon} alt="delete" />
          </div>
        ),
        disableSortBy: true,
        disableFilters: true,
      },
    ];
  }, [users]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const usersData = await ApiService.httpGet(`?results=${totalUsers}`);
        setUsers(usersData.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (users.length) {
      const countryList = users.map((obj) => obj.location.country);
      const countryObject = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const element of countryList) {
        if (countryObject[element]) {
          countryObject[element] += 1;
        } else {
          countryObject[element] = 1;
        }
      }

      const sortableCountry = [];
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const country in countryObject) {
        sortableCountry.push({
          label: country,
          count: countryObject[country],
          y: parseFloat(((countryObject[country] / totalUsers) * 100).toFixed(1)),
        });
      }

      sortableCountry.sort((a, b) => {
        return b.count - a.count;
      });

      const mostCountryArr = sortableCountry.slice(0, 5);
      const otherCountryCountArr = sortableCountry
        .slice(mostCountryArr.length, sortableCountry.length)
        .map((obj) => obj.count);
      const otherCountryCount = otherCountryCountArr.reduce((partialSum, a) => partialSum + a, 0);
      mostCountryArr.push({
        label: 'Other',
        count: otherCountryCount,
        y: parseFloat(((otherCountryCount / totalUsers) * 100).toFixed(1)),
      });
      mostCountryArr.sort((a, b) => {
        return b.count - a.count;
      });

      setCountryData(mostCountryArr);
    }
  }, [users]);

  return (
    <>
      <Container style={{ marginTop: 16 }} className="themed-container" fluid>
        <h3 className="page-title">{process.env.REACT_APP_TITLE}</h3>

        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">Top countries users belongs to</AccordionHeader>
            <AccordionBody accordionId="1">
              <CanvasJSChart options={chartOptions} />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
        <UserContactable columns={columns} data={users} loading={loading} />
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;
