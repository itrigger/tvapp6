import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import TVUpdateForm from "./TVUpdateForm";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getTVSel} from "../../../redux/reducers/tvs-selector";
import {getTV, putTV, setTV} from "../../../redux/reducers/tvs-reducer";
import {getShowsSel} from "../../../redux/reducers/show-selector";
import {getShows} from "../../../redux/reducers/show-reducer";
import {formValueSelector} from "redux-form";



class TVUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getTV(this.props.match.params.id);
        this.props.getShows(1,1000);
    };

    onSubmit = (tv) => {
        this.props.putTV(this.props.match.params.id, tv);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <TVUpdateForm initialValues={this.props.tv}
                          url={this.props.match.params.id}
                          onSubmit={this.onSubmit}
                          isAuth = {this.props.isAuth}
                          shows={this.props.shows}
                          curShow={this.props.formValue}
            />
        </>
    }
}

const selector = formValueSelector('TVUpdateForm');

let mapStateToProps = (state) => {
    return {
        tv: getTVSel(state),
        shows: getShowsSel(state),
        formValue: selector(state, 'show'),
    }
};

export default compose(
    connect(mapStateToProps, {setTV, putTV, getTV, getShows}),
    withRouter,
    withAuthRedirect
)(TVUpdateContainer);