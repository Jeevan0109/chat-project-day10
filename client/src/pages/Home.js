import React, { Fragment } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "./../context/auth";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`;

export default function Home({ history }) {
  const dispatch = useAuthDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <p>{user.username}</p>
      </div>
    ));
  }
  return (
    <Fragment>
      <Row className="bg-white mb-1 ">
        <Col>
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="bg-white mb-1">
        <Col xs={4}>{usersMarkup}</Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
    </Fragment>
  );
}
