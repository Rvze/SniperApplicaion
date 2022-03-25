import React from 'react';
import "./ResTable.module.css"
class ResTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.points || this.props.points.length === 0)
            return (
                <div className={"table"}/>
            )
        console.log(this.props)
        return (
            <div >
                <table >
                    <thead>
                    <tr>
                        <th>{this.props.coordinateX}</th>
                        <th>{this.props.coordinateY}</th>
                        <th>{this.props.radius}</th>
                        <th>{this.props.result}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(this.props.points) ? this.props.points.map(function (check) {
                            return (
                                <tr key={check.id}>
                                    <td>{check.x}</td>
                                    <td>{check.y}</td>
                                    <td>{check.r}</td>
                                    <td style={{color: check.hit ? '#00a404' : '#cb0101'}}>{check.hit.toString()}</td>
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