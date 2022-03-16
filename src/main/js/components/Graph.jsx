import React, {useEffect, useRef} from "react";
import store from "../store/store";
import Point from "../subsidiary/point";
import {check} from "../api/request"
import MainForm from "./MainForm";

const radiusSVG = 80;

const svg = useRef();


let r = store.getState().r
if (r == null)
    r = 1
class Graph {


    drawPoint = (pX, pY, radius, hit) => {
        const svgX = pX * radiusSVG / (radius * r);
        const svgY = -pY * radiusSVG / (radius * r);
        let pointSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        let color = isHit(store.getState().x, store.getState().y);
        console.log(store.getState().points)
        if (hit === true) {
            color = "green"
        } else
            color = "red"

        pointSVG.setAttribute("cx", svgX);
        pointSVG.setAttribute("cy", svgY);
        pointSVG.setAttribute("fill", color);
        pointSVG.setAttribute("drawRadius", radius);

        pointSVG.setAttribute("class", "svg_point");
        pointSVG.setAttribute("r", 1);
        pointSVG.setAttribute("stroke", "black");
        pointSVG.setAttribute("stroke-width", 0.5);
        svg.current.appendChild(pointSVG);
    }

    const handleOnClick = (e) => {
        console.log(r)
        e.preventDefault();
        let pnt = svg.current.createSVGPoint();
        pnt.x = e.clientX;
        pnt.y = e.clientY;
        let svgPnt = pnt.matrixTransform(svg.current.getScreenCTM().inverse());

        let point = new Point();
        point.coordinateX = svgPnt.x / radiusSVG * (r * r);
        point.coordinateY = -svgPnt.y / radiusSVG * (r * r);
        point.radius = r;
        check({
            x: point.coordinateX.toFixed(3),
            y: point.coordinateY.toFixed(3),
            r: point.radius,
            hit: point.hit
        }).then(response => response.json().then(json => {
            if (response.ok) {
                store.dispatch({type: "appendCheck", value: json});
            }
        }))
        drawPoint(point.coordinateX, point.coordinateY, point.radius, store.getState().points.pop().hit)
        new MainForm(point.coordinateX, point.coordinateY, point.radius).componentDidMount();
    }

    function isHit(x, y, rad) {
        return (x >= 0 && y <= 0 && y >= x - rad / 2) ||
            (x <= 0 && y >= 0 && x * x + y * y <= rad / 2 * rad / 2) ||
            (x >= 0 && y >= 0 && y <= rad && x <= rad);
    }

    return (
        <div className="graph">
            <svg ref={svg} onClick={handleOnClick} className="graph__svg" viewBox="-100 -100 200 200"
                 xmlns="http://www.w3.org/2000/svg" id="svg-area">
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
                <rect x="0" y={-radiusSVG / r} width={radiusSVG / r} height={radiusSVG / r} fill="rgb(128, 0, 255)"
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