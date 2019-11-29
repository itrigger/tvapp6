import {store} from "react-notifications-component";

export const Notify = (title='TVApp', message='', type='success') => {
    return store.addNotification({
        title: title,
        message: message,
        type: type,                         // 'default', 'success', 'info', 'warning'
        container: 'bottom-left',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        width: 300,
        dismiss: {
            duration: 3000
        }
    })
}
