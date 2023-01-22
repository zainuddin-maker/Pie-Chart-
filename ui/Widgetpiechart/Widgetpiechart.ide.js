TW.IDE.Widgets.Widgetpiechart = function () {
    // this.widgetIconUrl = function () {
    //     return "http://localhost:8015/Thingworx/Common/thingworx/widgets/mashup/mashup.ide.png";
    // };

    this.widgetProperties = function () {
        var properties = {
            name: "Widgetpiechart",
            description: "Widgetpiechart Chart",
            category: ["Common"],
            isExtension: true,
            supportsAutoResize: true,
            properties: {
                Widthpie: {
                    baseType: "NUMBER",
                    defaultValue: 400,
                },
                Heightpie: {
                    baseType: "NUMBER",
                    defaultValue: 200,
                },
                Radiuspie: {
                    baseType: "NUMBER",
                    defaultValue: 60,
                },
                TableData: {
                    baseType: "INFOTABLE",
                    isBindingTarget: true,
                },

                ShowLegend: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },

                StartTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date(),
                },
                EndTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date(),
                },

                Styleborder: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultChartStyle1",
                },
            },
        };

        return properties;
    };

    // The function is called before any property is updated in the ThingWorx Composer. You can perform validations on the new property value before it is committed. If the validation fails, you can return a message string to inform the user about the invalid input. The new property value is not be committed. If nothing is returned during the validation, then the value is assumed valid.
    //  this.beforeSetProperty = function (name, value) {
    //     // Validate Input Properties

    // };

    this.afterSetProperty = function (name, value) {
        this.updatedProperties();
        return true;
    };

    this.afterLoad = function () {};

    this.renderHtml = function () {
        return '<div class="widget-content widget-Widgetpiechart"></div>';
    };

    // this.afterRender = function () {
    //     // NOTE: this.jqElement is the jquery reference to your html dom element
    //     // 		 that was returned in renderHtml()

    //     // get a reference to the value element
    //     valueElem = this.jqElement.find(".HelloWorld-property");
    //     // update that DOM element based on the property value that the user set
    //     // in the mashup bHelloWorldlder
    //     valueElem.text(this.getProperty("Name"));
    // };

    this.afterRender = function () {
        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;

        d3v4.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.allWidgetProperties().properties;

            var widgetProps = {};

            for (const [key, value] of Object.entries(allWidgetProps)) {
                if (key.includes("Style")) {
                    widgetProps[key] = TW.getStyleFromStyleDefinition(
                        this.getProperty(key)
                    );
                } else {
                    widgetProps[key] = this.getProperty(key);
                }
            }

            console.log("widgetProps idle pie");
            console.log(widgetProps);
        } catch (error) {
            console.log("error");
            console.log(error);
        }

        //bar change
        var width = 400;
        height = 200;
        rsize = 60;
        borderpie = "#000000";
        var booleanlegenda = true;

        var varstartdate = new Date("2015-01-28T00:00:00.000Z");

        var varenddate = new Date("2015-01-28T00:00:00.000Z");

        //fix var
        margin = 40;
        padding = 20;

        // Create dummy data
        // var data = [{a: 90, b: 10}]

        const dataarray = {
            rows: [
                {
                    options: {
                        rows: [
                            {
                                color: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "#2ea32e",
                                        },
                                        {
                                            id: 2,
                                            value: "#2eff2e",
                                        },
                                    ],
                                },
                                type: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "Example 1",
                                        },
                                        {
                                            id: 2,
                                            value: "Example 2",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    values: {
                        rows: [
                            {
                                date: "2015-01-28T07:00:00.000Z",
                                id: 1,
                                value: 10,
                            },

                            {
                                date: "2015-01-28T07:00:00.000Z",
                                id: 3,
                                value: 10,
                            },

                            {
                                date: "2015-01-28T07:00:00.000Z",
                                id: 2,
                                value: 5,
                            },

                            {
                                date: "2015-01-29T07:00:00.000Z",
                                id: 3,
                                value: 10,
                            },
                        ],
                    },
                },
            ],
        };

        var arrayvalues = [];
        var enddate = new Date(
            new Date(varenddate).getTime() + 60 * 60 * 24 * 1000
        );

        dataarray.rows[0].values.rows.forEach((data, i) => {
            if (
                new Date(data.date) <= new Date(enddate) &&
                new Date(data.date) >= new Date(varstartdate)
            ) {
                arrayvalues.push(data);
            }
        });

        // arrayvalues.filter(data => new Date(data.date) < enddate);

        var arraynamedata = [];
        arrayvalues.forEach((data, i) => {
            if (
                arraynamedata.findIndex((element) => element.id === data.id) < 0
            ) {
                const objectrow = {
                    id: data.id,
                    name: "unknown",
                    value: parseInt(data.value),
                    color: data.id,
                };

                if (
                    dataarray.rows[0].options.rows[0].color.rows.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.color =
                        dataarray.rows[0].options.rows[0].color.rows[
                            dataarray.rows[0].options.rows[0].color.rows.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.color =
                        "#" + Math.floor(Math.random() * 16777215).toString(16);
                }

                if (
                    dataarray.rows[0].options.rows[0].type.rows.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.name =
                        dataarray.rows[0].options.rows[0].type.rows[
                            dataarray.rows[0].options.rows[0].type.rows.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.name = "name-" + data.id;
                }

                arraynamedata.push(objectrow);
            } else {
                arraynamedata[
                    arraynamedata.findIndex((element) => element.id === data.id)
                ].value += parseInt(data.value);
            }
        });

        var datanewdate = arraynamedata;

        var radius = rsize;

        var sumtotal = 0;
        datanewdate.forEach((element) => {
            sumtotal = sumtotal + element.value;
        });

        datanewdate.forEach((element, i) => {
            datanewdate[i] = {
                name: element.name,
                value: (element.value / sumtotal) * 100,
                color: element.color,
            };
        });

        var datanew = datanewdate;
        const newobj = {};
        const colorarray = [];
        const keyarray = [];
        datanew.forEach((element) => {
            newobj[element.name.toLocaleLowerCase()] = element.value;
            colorarray.push(element.color);
            keyarray.push(element.name);
        });
        const newarraydata = [newobj];

        // set the color scale
        var color = d3v4.scaleOrdinal().range(colorarray);
        // #2ea32e = hijau

        // #a61b1b = merah

        // "#FFFF00" = kuning

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.

        // append the svg object to the div called 'my_dataviz'

        // d3v4.select.select("#my_dataviz").append('div').attr("id","firstcontainer")

        var makemy_dataviz =  d3v4.select(`#${widgetID}`)
            .append("div")
            .attr("id", "my_dataviz")
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("align-items", "center");

        var tooltipdiv = d3v4
            .select("#my_dataviz")
            .append("div")
            .attr("id", "tooltippie")
            .attr("class", "hidden");

        tooltipdiv.append("p").attr("id", "name");
        tooltipdiv.append("p").attr("id", "value");

        var containerdiv = d3v4
            .select("#my_dataviz")
            .style("width", width + "px")
            .style("height", height + "px");

        var firstcontainer = d3v4
            .select("#my_dataviz")
            .append("div")
            .attr("id", "firstcontainer");

        var secondcontainer = d3v4
            .select("#my_dataviz")
            .append("div")
            .attr("id", "secondcontainer")
            .attr("class", "secondcontainer")
            // .style("background-color", "#eaeaea")
            .style("display", "flex")
            .style("width", width - (2 * radius + margin + padding) + "px")
            .style("height", 2 * radius + "px")
            .style("flex-direction", "column");

        // var svgsecond =d3v4
        // .select("#secondcontainer")
        // .append("svg")
        // // .attr("preserveAspectRatio", "xMinYMin meet")
        //   // .attr("viewBox","0 -254 "+(height)+" "+(width - (2 * radius + margin + padding))+"")
        //   // .attr("width","820")
        // // .attr("width", 2 * radius + margin + padding)
        // // .attr("height", height)
        // .append("g")

        // .attr(
        //     "transform",
        //     "translate(" + (0) + "," + height / 2 + ")"
        // );

        var svg = d3v4
            .select("#firstcontainer")
            .append("svg")
            .attr("width", 2 * radius + margin + padding)
            .attr("height", height)
            .append("g")
            .attr(
                "transform",
                "translate(" + (radius + margin) + "," + height / 2 + ")"
            );

        // Compute the position of each group on the pie:
        var pie = d3v4.pie().value(function (d) {
            return d.value;
        });

        // var data_ready = pie(d3v4.entries(data[0]))
        var data_readynew = pie(d3v4.entries(newarraydata[0]));

        function isOdd(num) {
            return num % 2;
        }

        var firstlegend = 0;

        const x = datanew.length;

        if (isOdd(datanew.length)) {
            firstlegend =
                9 + firstlegend + 16 + (Math.floor(x / 2) - 1) * 26 - 10;
        } else {
            firstlegend = firstlegend + 16 + (x / 2 - 1) * 26 - 10;
        }

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg.selectAll("whatever")
            .data(data_readynew)
            .enter()
            .append("path")
            .attr("d", d3v4.arc().innerRadius(0).outerRadius(radius))
            .attr("fill", function (d) {
                return color(d.data.key);
            })
            .attr("stroke", borderpie)
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .on("mouseenter", function (d) {
                d3v4.select("#tooltippie")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY  + "px")
                    .style("opacity", 1)
                    .style("display", "block")
                    .select("#name")
                    .text(d.data.key);

                d3v4.select("#tooltippie")

                    .select("#value")
                    .text(round(d.value, 1));
            })
            .on("mousemove", function (d) {
                d3v4.select("#tooltippie")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY  + "px")
                    .style("opacity", 1)
                    .style("display", "block")
                    .select("#name")
                    .text(d.data.key);

                d3v4.select("#tooltippie")
                    .select("#value")
                    .text(round(d.value, 1));
            })

            .on("mouseleave", (d) =>
                d3v4.select("#tooltippie").style("display", "none")
            );

        // .on("mouseover", function (d) {
        //     console.log("d");
        //     console.log(d);
        //     d3v4.select("#tooltip")
        //         // .style("left", d3v4.event.pageX + "px")
        //         // .style("top", d3v4.event.pageY + "px")
        //         .style("opacity", 1)
        //         .select("#name")
        //         .text(d.data.key);

        //     d3v4.select("#tooltip")
        //         .style("left", d3v4.event.pageX + "px")
        //         .style("top", d3v4.event.pageY + "px")
        //         .style("opacity", 1)
        //         .select("#value")
        //         .text(round(d.value, 1));
        //     // .select("#value").text(d.value);
        // })
        // .on("mouseout", function () {
        //     // Hide the tooltip
        //     d3v4.select("#tooltip").style("opacity", 0);
        // });

        // Legend
        var legend = secondcontainer
            .selectAll(".legend")
            .data(datanew)
            .enter()
            .append("div")
            .attr("class", "legend")
            .style("margin-bottom", "9px")
            .style("display", function (d) {
                if (booleanlegenda) {
                    return "flex";
                } else {
                    return "none";
                }
            });

        legend
            .append("div")
            .attr("class", "legendbox")

            .style("background-color", function (d) {
                return d.color;
            });
        legend
            .append("div")
            .attr("class", "legendtext")
            .text(function (d) {
                return d.name;
            });

        //   .append("g")
        //       .attr("transform", function (d, i) {
        //     if (i === 0) {
        //         return "translate(" + (-(2 * radius +padding) ) + "," + (firstlegend)  + ")";
        //     } else {
        //         return "translate(" + (-(2 * radius +padding) )  + "," + (firstlegend + i * -26 ) + ")";
        //     }
        // })
        //   .append("rect")
        //   .attr("x", 0 )
        //   .attr("height", 18)
        //   .attr("width", 25)
        //   .style("fill", color)

        // .append("text")
        // .attr("x", 2*radius + padding +26)
        // .attr("y", 9)
        // .attr("dy", ".35em")
        // .style("text-anchor", "start")
        // .text(function (d) {

        //     return d;
        // }).each(wrap);

        // legend
        //     .append("rect")
        // .attr("x", 2*radius + padding )
        // .attr("height", 18)
        // .attr("width", 25)
        // .style("fill", color);

        // legend
        //     .append("text")
        //     .attr("x", 2*radius + padding +26)
        //     .attr("y", 9)
        //     .attr("dy", ".35em")
        //     .style("text-anchor", "start")
        //     .text(function (d) {

        //         return d;
        //     }).each(wrap);

        // function wrap() {
        //     var self = d3v4.select(this),
        //         textLength = self.node().getComputedTextLength(),
        //         text = self.text();
        //     while (textLength > 50 && text.length > 0) {
        //         text = text.slice(0, -1);
        //         self.text(text + "...");
        //         textLength = self.node().getComputedTextLength();
        //     }
        // }

        function round(value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
    };

    // this.widgetEvents = function () {
    //     return {
    //         DoubleClicked: {
    //             description:
    //                 "Event triggered when a row has been double clicked",
    //         },
    //         Clicked: {
    //             description: "Event triggered when a row has been clicked",
    //         },
    //     };
    // };
};
