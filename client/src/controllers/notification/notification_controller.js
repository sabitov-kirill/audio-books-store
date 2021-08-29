/**
 *
 * CREATION DATE: 28.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Notifications controller handle module
 *
 */

import { connect } from "react-redux";

import NotificationView from "../../views/notification/notification_view";

// Component view, connected to model
export default connect(
    (state) =>({
        notification: state.notification.code,
        id: state.notification.id,
    })
)(NotificationView);