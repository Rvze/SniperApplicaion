import React, {useEffect, useRef} from "react";
import Point from "../../subsidiary/point";
import {check} from "../../api/request"
import $ from "jquery";
import store from "../../store/store";
import "./Graph.css"

const radiusSVG = 80;
let color;

const Graph = () => {
    const svg = useRef();
    let r = store.getState().r
    if (r == null)
        r = 1
    const delay = 1;

    useEffect(() => {
        let timer = setTimeout(() => getDotFromTable(), delay * 100)
        return () => {
            clearTimeout(timer)
        }
    })

    const getDotFromTable = () => {
        console.log(r)
        $("tbody tr").each(function () {
            $("#pointId").remove();
        })
        $("tbody tr").each(function () {
            const point = $(this);

            const x = parseFloat(point.find("td:first-child").text());
            const y = parseFloat(point.find("td:nth-child(2)").text());
            const rVal = parseFloat(point.find("td:nth-child(3)").text());
            let res = point.find("td:nth-child(4)").text();
            let result = (res === "true");

            drawPoint(x, y, rVal, result)
        })
    }

    function drawPoint(pX, pY, radius, hit) {
        const svgX = pX * radiusSVG / (radius * r);
        const svgY = -pY * radiusSVG / (radius * r);
        let pointSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        if (hit === true) {
            color = "green"
        } else
            color = "red"

        pointSVG.setAttribute("cx", svgX);
        pointSVG.setAttribute("cy", svgY);
        pointSVG.setAttribute("fill", color);
        pointSVG.setAttribute("drawRadius", radius);
        pointSVG.setAttribute("id", "pointId")

        pointSVG.setAttribute("class", "svg_point");
        pointSVG.setAttribute("r", 1);
        pointSVG.setAttribute("stroke", "black");
        pointSVG.setAttribute("stroke-width", 0.5);
        svg.current.appendChild(pointSVG);
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        let pnt = svg.current.createSVGPoint();
        pnt.x = e.clientX;
        pnt.y = e.clientY;
        let svgPnt = pnt.matrixTransform(svg.current.getScreenCTM().inverse());

        let point = new Point();
        point.coordinateX = svgPnt.x / radiusSVG * (r * r);
        point.coordinateY = -svgPnt.y / radiusSVG * (r * r);
        point.radius = r;
        point.hit = isHit(point.coordinateX, point.coordinateY, point.radius)
        check({
            x: point.coordinateX.toFixed(3),
            y: point.coordinateY.toFixed(3),
            r: point.radius,
            hit: point.hit
        }).then(response => response.json().then(json => {
            if (response.ok) {
                store.dispatch({type: "appendCheck", value: json});
                drawPoint(point.coordinateX, point.coordinateY, point.radius, point.hit)
            } else if (response.status === 400) {
                store.dispatch({type: 'snackbar', value: {active: true, label: json.message()}});
                console.log("ALERT")
            }
        }))
    }

    function isHit(x, y, rad) {
        return (x >= 0 && y <= 0 && y >= x - rad) ||
            (x <= 0 && y >= 0 && x * x + y * y <= rad / 2 * rad / 2) ||
            (x >= 0 && y >= 0 && y <= rad && x <= rad);
    }


    return (

        <div className="graph">
            <svg ref={svg} className="graph_svg" onClick={handleOnClick} viewBox="-100 -100 200 200"
                 xmlns="http://www.w3.org/2000/svg" id="svg-area" height="550"
                 style={{margin: "0 auto", borderRadius: "30%", backgroundColor: "#efefef", textAlign: "center", display:"block"}}>
                <defs>
                    <marker id='arrow-head' orient="auto"
                            markerWidth='2' markerHeight='4'
                            refX='0.1' refY='2'>
                        {/* <!-- triangle pointing right (+x) --> */}
                        <path d='M0,0 V4 L2,2 Z' fill="black"/>
                    </marker>
                </defs>
                {/*Triangle*/}
                <polygon points={`0 0, ${radiusSVG / r}  0, 0 ${radiusSVG / r}`} fill="rgb(0, 160, 223)"
                         fillOpacity="0.5"/>

                {/*Rectangle*/}
                <rect x="0" y={-radiusSVG / r} width={radiusSVG / r} height={radiusSVG / r}
                      fill="rgb(128, 0, 255)"
                      fillOpacity="0.5"/>

                {/*Circle*/}
                <path fill="rgb(128,128,128)"
                      d={`M 0, ${-radiusSVG / r / 2} a ${radiusSVG / r / 2}, ${radiusSVG / r / 2} 0 0 0 ${-radiusSVG / r / 2},${radiusSVG / r / 2} L 0 0 Z`}
                      fillOpacity="0.5"/>
                <path
                    d="M -95 0, h 190"
                    stroke="black"
                    strokeWidth="1"
                    markerEnd="url(#arrow-head)"/>
                <path
                    d="M 0 95, v -190"
                    stroke="black"
                    strokeWidth="1"
                    markerEnd="url(#arrow-head)"/>

                <style>
                    {`
                        .inscription {
                            font-size:7px;
                            font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            font-style: normal;
                        }
                    `}
                </style>

                <text x="92" y="-3" className="inscription">x</text>
                <text x="3" y="-92" className="inscription">y</text>
                <text x={36 / r} y={-3 / r} className="inscription">R/2</text>
                <text x={-47 / r} y={-3 / r} className="inscription">-R/2</text>
                <text x={3 / r} y={42 / r} className="inscription">-R/2</text>
                <text x={3 / r} y={-38 / r} className="inscription">R/2</text>
                <text x={78 / r} y={-3 / r} className="inscription">R</text>
                <text x={-84 / r} y={-3 / r} className="inscription">-R</text>
                <text x={3 / r} y={82 / r} className="inscription">-R</text>
                <text x={3 / r} y={-78 / r} className="inscription">R</text>
                <circle cx="0" cy="0" r="1.5" fill="black"/>
                <circle cx="0" cy={40 / r} r="1.5" fill="black"/>
                <circle cx="0" cy={-40 / r} r="1.5" fill="black"/>
                <circle cx={40 / r} cy="0" r="1.5" fill="black"/>
                <circle cx={-40 / r} cy="0" r="1.5" fill="black"/>
                <circle cx={80 / r} cy="0" r="1.5" fill="black"/>
                <circle cx={-80 / r} cy="0" r="1.5" fill="black"/>
                <circle cx="0" cy={80 / r} r="1.5" fill="black"/>
                <circle cx="0" cy={-80 / r} r="1.5" fill="black"/>

            </svg>

        </div>
    )

}

export default Graph;