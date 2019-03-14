import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Snackbar } from 'react-native-paper'
import { setSaleGeneratedSnackbarVisible } from './redux/actions';

class Index extends Component {

    _renderSaleGeneratedSnackbar = () => {
        if (!this.props.saleGeneratedSnackbarVisible)
            return;
        return (
            <Animatable.View animation="slideInUp">
                <Snackbar
                    duration={Snackbar.DURATION_LONG}
                    visible={this.props.saleGeneratedSnackbarVisible}
                    onDismiss={() => this.props.setSaleGeneratedSnackbarVisible(false)}
                    action={{
                        label: 'View Receipt',
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    Vehicle Sold!
                </Snackbar>
            </Animatable.View>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this._renderSaleGeneratedSnackbar()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        saleGeneratedSnackbarVisible: state.sales.saleGeneratedSnackbarVisible
    }
}

export default connect(mapStateToProps, {
    setSaleGeneratedSnackbarVisible
})(Index);