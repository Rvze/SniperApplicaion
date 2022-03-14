export function Svg() {
    return (
        <svg className="svg-axis" xmlns="http://www.w3.org/2000/svg" width="300" height="300" id="area">

            <line x1="0" y1="150" x2="300" y2="150" stroke="#003"/>
            <line x1="150" y1="0" x2="150" y2="300" stroke="#003"/>
            <polygon points="300,150 295,145 295,155" fill="#003" stroke="#000"/>
            <polygon points="150,0 145,5 155,5" fill="#003" stroke="#000"/>
            <line x1="270" y1="155" x2="270" y2="145" stroke="#000"/>
            <text x="265" y="140" className="axis-text" id="radius-text-right">R</text>
            <line x1="210" y1="155" x2="210" y2="145" stroke="#000"/>

            <text x="200" y="140" className="axis-text" id="radius-text-right-half">R/2</text>
            <line x1="90" y1="155" x2="90" y2="145" stroke="#000"/>

            <text x="75" y="140" className="axis-text" id="radius-text-left-half">-R/2</text>
            <line x1="30" y1="155" x2="30" y2="145" stroke="#000"/>
            <text x="23" y="140" className="axis-text" id="radius-text-left">-R</text>
            <line x1="145" y1="30" x2="155" y2="30" stroke="#000"/>
            <text x="157" y="35" className="axis-text" id="radius-text-top">R</text>
            <line x1="145" y1="90" x2="155" y2="90" stroke="#000"/>

            <text x="157" y="95" className="axis-text" id="radius-text-top-half">R/2</text>
            <line x1="145" y1="210" x2="155" y2="210" stroke="#000"/>

            <text x="157" y="215" className="axis-text" id="radius-text-bottom-half">-R/2</text>
            <line x1="145" y1="270" x2="155" y2="270" stroke="#000"/>
            <text x="157" y="275" className="axis-text" id="radius-text-bottom">-R</text>

            <polygon points="210,150 150,270 150,150" fill="#00f" stroke="#003" fillOpacity="0.5"/>
            <rect height="120" width="120" x="150" y="30" fillOpacity="0.5" fill="#a0f" stroke="#003"/>
            <path stroke="#003"
                  d=" M 90 150                           h60                           v-60                           A70 70 0 0 0 90 150"
                  fillOpacity="0.5"/>
        </svg>
    )
}