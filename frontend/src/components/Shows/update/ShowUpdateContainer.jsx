import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getShowSel} from "../../../redux/reducers/show-selector";
import {getShow, putShow, setShow} from "../../../redux/reducers/show-reducer";
import ShowUpdateForm from "./ShowUpdateForm";
import $ from "jquery";
import {change, formValueSelector} from "redux-form";
import {getSlidesSortedSel} from "../../../redux/reducers/slide-selector";
import {getSlides} from "../../../redux/reducers/slide-reducer";


class ShowUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getShow(this.props.match.params.id);
        this.props.getSlides(1,1000);
    };

    imgClick = (id) => {
        if(this.props.formValues2.split(';').find(i=> i === id)){

        } else {
           let changedID = $('input[name=slides]').val() + id.replace(/\s+/g,'') + ';';
            this.props.change('showUpdateForm','slides',changedID);
        }


    };

    onSubmit = (show) => {
        this.props.putShow(this.props.match.params.id, {show});
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <ShowUpdateForm initialValues={this.props.show}
                            url={this.props.match.params.id}
                            onSubmit={this.onSubmit}
                            isAuth = {this.props.isAuth}
                            slides={this.props.slides}
                            onClick={this.imgClick}
                            formValues={this.props.formValues2}
            />
        </>
    }
}

const selector = formValueSelector('showUpdateForm');

let mapStateToProps = (state) => {
    return {
        show: getShowSel(state),
        slides: getSlidesSortedSel(state),
        formValues2: selector(state, 'slides'),
    }
};

export default compose(
    connect(mapStateToProps, {setShow, putShow, getShow, getSlides, change}),
    withRouter,
    withAuthRedirect
)(ShowUpdateContainer);