import React from 'react';
import "../styles/table.css"

class ResTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {points: []}
    }

    render() {

        if (!this.props.points || this.props.points.length === 0)
            return (
                <div className={"Table"}/>
            )
        return (
            <div className={"Table"}>
                <table>
                    <thead>
                    <tr>
                        <th>{this.props.coordinateX}</th>
                        <th>{this.props.coordinateY}</th>
                        <th>{this.props.radius}</th>
                        <th>{this.props.result}</th>
                        <th>{this.props.localDateTime}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(this.props.points) ? this.props.points.map(function (check) {
                            return (
                                <tr key={check.id}>
                                    <td>{check.x}</td>
                                    <td>{check.y}</td>
                                    <td>{check.r}</td>
                                    <td>{check.hit.toString()}</td>
                                    <td>{check.localDateTime}</td>
                                </tr>
                            )
                        }) :
                        <tr>
                            <td>Loading ...</td>
                        </tr>
                    }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default ResTable;