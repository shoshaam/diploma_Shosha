import React, { Suspense } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';

import LoadingSpinner from "../LoadingSpinner";
import ProtectedRoute from '../../HOCS/ProtectedRoute';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import NotFound from '../../pages/NotFound';
import CardDetail from '../../pages/CardDetail';
import MyLandmarks from '../../pages/MyLandmarks';
import EditLandmark from '../../pages/EditLandmark';
import Catalog from '../../pages/Catalog';
import AddLandmark from '../../pages/AddLandmark/AddLandmark';
import styles from "./Routes.module.scss";
const Home = React.lazy(() => import("../../pages/Home"));

const ADMIN = "admin";

const Routes = ({ currentUser }) => {

  const role = currentUser.data.role ? currentUser.data.role : false;

  return (
    <Suspense
      fallback={
        <div className={styles.centered}>
          <LoadingSpinner />
        </div>
      }
    >
      <Switch>
      <Route exact path='/'>
        <Redirect to='/Home' />
      </Route>
      <ProtectedRoute
        condition={true}
        path='/SignIn'
        component={SignIn}
      />
      <ProtectedRoute
        condition={true}
        path='/SignUp'
        component={SignUp}
      />
      <ProtectedRoute
        condition={true}
        path='/Home'
        component={Home}
      />
      <ProtectedRoute
        condition={role}
        path='/MyLandmarks'
        component={MyLandmarks}
      />
      <ProtectedRoute
        condition={role === ADMIN}
        path='/AddLandmark'
        component={AddLandmark}
      />
      <ProtectedRoute
        condition={true}
        path='/card/:id'
        component={CardDetail}
      />
      <ProtectedRoute
        condition={role}
        path='/cardedit/:id'
        component={EditLandmark}
      />
      <ProtectedRoute
        condition={true}
        path='/Catalog'
        component={Catalog}
      />
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
export default connect(mapStateToProps)(Routes);
