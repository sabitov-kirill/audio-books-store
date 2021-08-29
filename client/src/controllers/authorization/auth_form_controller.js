/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniel Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                User authorization form controller handle module
 *
 */

import { connect } from "react-redux";
import AuthForm from "../../views/authorization/auth_form";

import { notify } from '../../models/notification_model'

// Connecting component view to model with controller
export default connect(
    null,
    (dispatch) => ({
        offline: () => dispatch(notify({ code: 'offlineAuth' }))
    })
)(AuthForm);