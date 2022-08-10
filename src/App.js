import React, { useEffect, useState, useMemo, Fragment } from "react";
import { Container } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { confirmAlert } from 'react-confirm-alert';
import Moment from 'react-moment';

import UserContactable from "./components/user-contact-table";
import ApiService from './services/Api.service';
import deleteIcon from './assets/delete.png';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

if (typeof window !== "undefined") {
  injectStyle();
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: row => `${row.name.first} ${row.name.last}`,
        Cell: (cellProps) => {
          return `${cellProps.row.original.name.first} ${cellProps.row.original.name.last}`
        }
      },
      {
        Header: "Location",
        accessor: row => `${row.location.city} ${row.location.country}`,
        Cell: (cellProps) => {
          return `${cellProps.row.original.location.city}, ${cellProps.row.original.location.country}`
        }
      },
      {
        Header: "Registered",
        accessor: "registered.date",
        Cell: (cellProps) => {
          return <Moment format="MM/DD/YYYY">{`${cellProps.row.original.registered.date}`}</Moment>
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableSortBy: true
      },
      {
        Header: "Picture",
        accessor: "picture.thumbnail",
        Cell: (cellProps) => {
          return <img src={`${cellProps.row.original.picture.thumbnail}`} alt={`${cellProps.row.original.name.first} ${cellProps.row.original.name.last}`} />
        },
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: "Delete",
        id: 'delete',
        accessor: str => "delete",
        Cell: (cellProps) => (
          <div className="delete-icon-container" onClick={() => {
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
                    toast.success("User removed successfully.");
                  }
                },
                {
                  label: 'No'
                }
              ]
            });
          }}>
            <img src={deleteIcon} alt="delete"/>
          </div>
        ),
        disableSortBy: true,
        disableFilters: true
      }
    ],
    [users]
  );
  
  useEffect(() => {
    (async() => {
      try {
        setLoading(true);
        const usersData = await ApiService.httpGet('?results=500');
        setUsers(usersData.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    })();
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: 100 }} className="themed-container" fluid={true}>
        <UserContactable columns={columns} data={users} loading={loading} />
      </Container>
      <ToastContainer />
    </Fragment>
  )
}

export default App