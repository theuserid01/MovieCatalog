import React from 'react'

import Spinner from '../components/shared/Spinner'

const withLoading = (WrappedComponent, request, param) =>
    class extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                data: {},
                ready: false
            }
        }

        componentDidMount() {
            this.getData()
        }

        async getData() {
            try {
                let res = null
                if (!param.id) {
                    res = await request()
                } else {
                    const id = this.props.match.params.id
                    res = await request(id)
                }

                if (!res.success) {
                    console.log(res.message)
                    return
                }

                this.setState({
                    data: res.data,
                    ready: true
                })
            } catch (e) {
                console.log(e)
            }
        }

        render() {
            if (!this.state.ready) {
                return <Spinner />
            }

            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }

export default withLoading
