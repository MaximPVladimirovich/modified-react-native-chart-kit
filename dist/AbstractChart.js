var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
export var DEFAULT_X_LABELS_HEIGHT_PERCENTAGE = 0.75;
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero && _this.props.fromNumber) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [_this.props.fromNumber])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else if (_this.props.fromZero) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [0])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else if (_this.props.fromNumber) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [_this.props.fromNumber])) -
            Math.min.apply(
              Math,
              __spreadArrays(data, [_this.props.fromNumber])
            ) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      var basePosition = height * verticalLabelsHeightPercentage;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height * verticalLabelsHeightPercentage + paddingTop}
          x2={width}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c,
        _d = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _d === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _d;
      var _e = _this.props,
        _f = _e.yAxisLabel,
        yAxisLabel = _f === void 0 ? "" : _f,
        _g = _e.yAxisSuffix,
        yAxisSuffix = _g === void 0 ? "" : _g,
        _h = _e.yLabelsOffset,
        yLabelsOffset = _h === void 0 ? 12 : _h;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height * verticalLabelsHeightPercentage;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : height * verticalLabelsHeightPercentage -
              (basePosition / count) * i +
              paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForHorizontalLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var labelsXTotal;
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f,
        _g = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g;
      var _h = _this.props,
        _j = _h.xAxisLabel,
        xAxisLabel = _j === void 0 ? "" : _j,
        _k = _h.xLabelsOffset,
        xLabelsOffset = _k === void 0 ? 0 : _k,
        _l = _h.hidePointsAtIndex,
        hidePointsAtIndex = _l === void 0 ? [] : _l;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y =
          height * verticalLabelsHeightPercentage +
          paddingTop +
          fontSize * 2 +
          xLabelsOffset;

        if (labels.length <= 8) {
          // new X value code. some of the thresholds may need to be adjusted for your case
          if (i === labels.length - 1 && width - xLabelsOffset > 55)
            x = width - 30;

          // update totalXWidth var for each labels's x value
          labelsXTotal = +x;
        }

        return (
          <Text
            origin={x + ", " + y}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForVerticalLabels()}
          >
            {"" + formatXLabel(label) + xAxisLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      var _c = _this.props.yAxisInterval,
        yAxisInterval = _c === void 0 ? 1 : _c;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height * verticalLabelsHeightPercentage + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      var fillShadowGradientFrom = config.hasOwnProperty(
        "fillShadowGradientFrom"
      )
        ? config.fillShadowGradientFrom
        : fillShadowGradient;
      var fillShadowGradientFromOpacity = config.hasOwnProperty(
        "fillShadowGradientFromOpacity"
      )
        ? config.fillShadowGradientFromOpacity
        : fillShadowGradientOpacity;
      var fillShadowGradientFromOffset = config.hasOwnProperty(
        "fillShadowGradientFromOffset"
      )
        ? config.fillShadowGradientFromOffset
        : 0;
      var fillShadowGradientTo = config.hasOwnProperty("fillShadowGradientTo")
        ? config.fillShadowGradientTo
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientToOpacity = config.hasOwnProperty(
        "fillShadowGradientToOpacity"
      )
        ? config.fillShadowGradientToOpacity
        : 0.1;
      var fillShadowGradientToOffset = config.hasOwnProperty(
        "fillShadowGradientToOffset"
      )
        ? config.fillShadowGradientToOffset
        : 1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradientFrom_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset={fillShadowGradientFromOffset}
                    stopColor={
                      dataset.color
                        ? dataset.color(1.0)
                        : fillShadowGradientFrom
                    }
                    stopOpacity={fillShadowGradientFromOpacity}
                  />
                  <Stop
                    offset={fillShadowGradientToOffset}
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientFromOpacity)
                        : fillShadowGradientFrom
                    }
                    stopOpacity={fillShadowGradientToOpacity || 0}
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradientFrom"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset={fillShadowGradientFromOffset}
                stopColor={fillShadowGradientFrom}
                stopOpacity={fillShadowGradientFromOpacity}
              />
              <Stop
                offset={fillShadowGradientToOffset}
                stopColor={fillShadowGradientTo || fillShadowGradientFrom}
                stopOpacity={fillShadowGradientToOpacity || 0}
              />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  AbstractChart.prototype.getPropsForVerticalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForVerticalLabels,
      propsForVerticalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForVerticalLabels);
  };
  AbstractChart.prototype.getPropsForHorizontalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForHorizontalLabels,
      propsForHorizontalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForHorizontalLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFDMUUsTUFBTSxDQUFDLElBQU0sa0NBQWtDLEdBQUcsSUFBSSxDQUFDO0FBRXZEO0lBR1UsaUNBQW1FO0lBSDdFO1FBQUEscUVBc2ZDO1FBbGZDLGdCQUFVLEdBQUcsVUFBQyxJQUFjO1lBQzFCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsTUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3RTtpQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsQ0FBQyxNQUFJLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FDTCxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLEtBQUksQ0FBQyxL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QkFDRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUNsQix3QkFBd0IsRUFDM0I7SUFDSixDQUFDO0lBeVpILG9CQUFDO0FBQUQsQ0FBQyxBQXRmRCxDQUdVLFNBQVMsR0FtZmxCO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEZWZzLCBMaW5lLCBMaW5lYXJHcmFkaWVudCwgU3RvcCwgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XG5cbmltcG9ydCB7IENoYXJ0Q29uZmlnLCBEYXRhc2V0LCBQYXJ0aWFsQnkgfSBmcm9tIFwiLi9IZWxwZXJUeXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRQcm9wcyB7XG4gIGZyb21aZXJvPzogYm9vbGVhbjtcbiAgZnJvbU51bWJlcj86IG51bWJlcjtcbiAgY2hhcnRDb25maWc/OiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcbiAgeUxhYmVsc09mZnNldD86IG51bWJlcjtcbiAgeUF4aXNJbnRlcnZhbD86IG51bWJlcjtcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcbiAgeExhYmVsc09mZnNldD86IG51bWJlcjtcbiAgaGlkZVBvaW50c0F0SW5kZXg/OiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENoYXJ0Q29uZmlnIGV4dGVuZHMgQ2hhcnRDb25maWcge1xuICBjb3VudD86IG51bWJlcjtcbiAgZGF0YT86IERhdGFzZXRbXTtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgcGFkZGluZ1RvcD86IG51bWJlcjtcbiAgcGFkZGluZ1JpZ2h0PzogbnVtYmVyO1xuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcbiAgZm9ybWF0WUxhYmVsPzogKHlMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGxhYmVscz86IHN0cmluZ1tdO1xuICBob3Jpem9udGFsT2Zmc2V0PzogbnVtYmVyO1xuICBzdGFja2VkQmFyPzogYm9vbGVhbjtcbiAgdmVydGljYWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xuICBmb3JtYXRYTGFiZWw/OiAoeExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcbiAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlPzogbnVtYmVyO1xuICBmb3JtYXRUb3BCYXJWYWx1ZT86ICh0b3BCYXJWYWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEFic3RyYWN0Q2hhcnRTdGF0ZSA9IHt9O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRSA9IDAuNzU7XG5cbmNsYXNzIEFic3RyYWN0Q2hhcnQ8XG4gIElQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyxcbiAgSVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RDaGFydFN0YXRlXG4+IGV4dGVuZHMgQ29tcG9uZW50PEFic3RyYWN0Q2hhcnRQcm9wcyAmIElQcm9wcywgQWJzdHJhY3RDaGFydFN0YXRlICYgSVN0YXRlPiB7XG4gIGNhbGNTY2FsZXIgPSAoZGF0YTogbnVtYmVyW10pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mcm9tWmVybyAmJiB0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heCguLi5kYXRhLCB0aGlzLnByb3BzLmZyb21OdW1iZXIpIC0gTWF0aC5taW4oLi4uZGF0YSwgMCkgfHwgMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZnJvbVplcm8pIHtcbiAgICAgIHJldHVybiBNYXRoLm1heCguLi5kYXRhLCAwKSAtIE1hdGgubWluKC4uLmRhdGEsIDApIHx8IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIE1hdGgubWF4KC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgLVxuICAgICAgICAgIE1hdGgubWluKC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgfHwgMVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEpIC0gTWF0aC5taW4oLi4uZGF0YSkgfHwgMTtcbiAgICB9XG4gIH07XG5cbiAgY2FsY0Jhc2VIZWlnaHQgPSAoZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XG4gICAgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcbiAgICAgIHJldHVybiAoaGVpZ2h0ICogbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKTtcbiAgICB9XG4gIH07XG5cbiAgY2FsY0hlaWdodCA9ICh2YWw6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XG5cbiAgICBpZiAobWluIDwgMCAmJiBtYXggPiAwKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XG4gICAgfSBlbHNlIGlmIChtaW4gPj0gMCAmJiBtYXggPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJvbVplcm9cbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWluKSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA8PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xuICAgICAgICA/IGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtYXgpIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKSB7XG4gICAgY29uc3QgeyBwcm9wc0ZvckJhY2tncm91bmRMaW5lcyA9IHt9IH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICBzdHJva2U6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC4yKSxcbiAgICAgIHN0cm9rZURhc2hhcnJheTogXCI1LCAxMFwiLFxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAuLi5wcm9wc0ZvckJhY2tncm91bmRMaW5lc1xuICAgIH07XG4gIH1cblxuICBnZXRQcm9wc0ZvckxhYmVscygpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wc0ZvckxhYmVscyA9IHt9LFxuICAgICAgY29sb3IsXG4gICAgICBsYWJlbENvbG9yID0gY29sb3JcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcbiAgICByZXR1cm4ge1xuICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxuICAgICAgLi4ucHJvcHNGb3JMYWJlbHNcbiAgICB9O1xuICB9XG5cbiAgZ2V0UHJvcHNGb3JWZXJ0aWNhbExhYmVscygpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wc0ZvclZlcnRpY2FsTGFiZWxzID0ge30sXG4gICAgICBjb2xvcixcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXG4gICAgICAuLi5wcm9wc0ZvclZlcnRpY2FsTGFiZWxzXG4gICAgfTtcbiAgfVxuXG4gIGdldFByb3BzRm9ySG9yaXpvbnRhbExhYmVscygpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wc0Zvckhvcml6b250YWxMYWJlbHMgPSB7fSxcbiAgICAgIGNvbG9yLFxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcbiAgICAgIC4uLnByb3BzRm9ySG9yaXpvbnRhbExhYmVsc1xuICAgIH07XG4gIH1cblxuICByZW5kZXJIb3Jpem9udGFsTGluZXMgPSBjb25maWcgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvdW50LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBwYWRkaW5nVG9wLFxuICAgICAgcGFkZGluZ1JpZ2h0LFxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxuICAgIH0gPSBjb25maWc7XG4gICAgY29uc3QgYmFzZVBvc2l0aW9uID0gaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlO1xuXG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoY291bnQgKyAxKV0ubWFwKChfLCBpKSA9PiB7XG4gICAgICBjb25zdCB5ID0gKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgKyBwYWRkaW5nVG9wO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExpbmVcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgeDE9e3BhZGRpbmdSaWdodH1cbiAgICAgICAgICB5MT17eX1cbiAgICAgICAgICB4Mj17d2lkdGh9XG4gICAgICAgICAgeTI9e3l9XG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVySG9yaXpvbnRhbExpbmUgPSBjb25maWcgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcGFkZGluZ1RvcCxcbiAgICAgIHBhZGRpbmdSaWdodCxcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcbiAgICB9ID0gY29uZmlnO1xuICAgIHJldHVybiAoXG4gICAgICA8TGluZVxuICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XG4gICAgICAgIHkxPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxuICAgICAgICB4Mj17d2lkdGh9XG4gICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxuICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXG4gICAgY29uZmlnOiBPbWl0PEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPiAmIHsgZGF0YTogbnVtYmVyW10gfVxuICApID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb3VudCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWlnaHQsXG4gICAgICBwYWRkaW5nVG9wLFxuICAgICAgcGFkZGluZ1JpZ2h0LFxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxuICAgICAgZGVjaW1hbFBsYWNlcyA9IDIsXG4gICAgICBmb3JtYXRZTGFiZWwgPSAoeUxhYmVsOiBzdHJpbmcpID0+IHlMYWJlbCxcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgY29uc3Qge1xuICAgICAgeUF4aXNMYWJlbCA9IFwiXCIsXG4gICAgICB5QXhpc1N1ZmZpeCA9IFwiXCIsXG4gICAgICB5TGFiZWxzT2Zmc2V0ID0gMTJcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbmV3IEFycmF5KGNvdW50ID09PSAxID8gMSA6IGNvdW50ICsgMSkuZmlsbCgxKS5tYXAoKF8sIGkpID0+IHtcbiAgICAgIGxldCB5TGFiZWwgPSBTdHJpbmcoaSAqIGNvdW50KTtcblxuICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXG4gICAgICAgICAgZGF0YVswXS50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXG4gICAgICAgICl9JHt5QXhpc1N1ZmZpeH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLnByb3BzLmZyb21aZXJvXG4gICAgICAgICAgPyAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEsIDApXG4gICAgICAgICAgOiAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEpO1xuICAgICAgICB5TGFiZWwgPSBgJHt5QXhpc0xhYmVsfSR7Zm9ybWF0WUxhYmVsKFxuICAgICAgICAgIGxhYmVsLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcbiAgICAgIGNvbnN0IHggPSBwYWRkaW5nUmlnaHQgLSB5TGFiZWxzT2Zmc2V0O1xuICAgICAgY29uc3QgeSA9XG4gICAgICAgIGNvdW50ID09PSAxICYmIHRoaXMucHJvcHMuZnJvbVplcm9cbiAgICAgICAgICA/IHBhZGRpbmdUb3AgKyA0XG4gICAgICAgICAgOiBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgLVxuICAgICAgICAgICAgKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgK1xuICAgICAgICAgICAgcGFkZGluZ1RvcDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUZXh0XG4gICAgICAgICAgcm90YXRpb249e2hvcml6b250YWxMYWJlbFJvdGF0aW9ufVxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICB4PXt4fVxuICAgICAgICAgIHRleHRBbmNob3I9XCJlbmRcIlxuICAgICAgICAgIHk9e3l9XG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKX1cbiAgICAgICAgPlxuICAgICAgICAgIHt5TGFiZWx9XG4gICAgICAgIDwvVGV4dD5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyVmVydGljYWxMYWJlbHMgPSAoe1xuICAgIGxhYmVscyA9IFtdLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nUmlnaHQsXG4gICAgcGFkZGluZ1RvcCxcbiAgICBob3Jpem9udGFsT2Zmc2V0ID0gMCxcbiAgICBzdGFja2VkQmFyID0gZmFsc2UsXG4gICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcbiAgICBmb3JtYXRYTGFiZWwgPSB4TGFiZWwgPT4geExhYmVsLFxuICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcbiAgfTogUGljazxcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICAgIHwgXCJsYWJlbHNcIlxuICAgIHwgXCJ3aWR0aFwiXG4gICAgfCBcImhlaWdodFwiXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXG4gICAgfCBcInBhZGRpbmdUb3BcIlxuICAgIHwgXCJob3Jpem9udGFsT2Zmc2V0XCJcbiAgICB8IFwic3RhY2tlZEJhclwiXG4gICAgfCBcInZlcnRpY2FsTGFiZWxSb3RhdGlvblwiXG4gICAgfCBcImZvcm1hdFhMYWJlbFwiXG4gICAgfCBcInZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVwiXG4gID4pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB4QXhpc0xhYmVsID0gXCJcIixcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxuICAgICAgaGlkZVBvaW50c0F0SW5kZXggPSBbXVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9udFNpemUgPSAxMjtcblxuICAgIGxldCBmYWMgPSAxO1xuICAgIGlmIChzdGFja2VkQmFyKSB7XG4gICAgICBmYWMgPSAwLjcxO1xuICAgIH1cblxuICAgIHJldHVybiBsYWJlbHMubWFwKChsYWJlbCwgaSkgPT4ge1xuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB4ID1cbiAgICAgICAgKCgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gbGFiZWxzLmxlbmd0aCkgKiBpICtcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xuICAgICAgICAgIGhvcml6b250YWxPZmZzZXQpICpcbiAgICAgICAgZmFjO1xuXG4gICAgICBjb25zdCB5ID1cbiAgICAgICAgaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICtcbiAgICAgICAgcGFkZGluZ1RvcCArXG4gICAgICAgIGZvbnRTaXplICogMiArXG4gICAgICAgIHhMYWJlbHNPZmZzZXQ7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUZXh0XG4gICAgICAgICAgb3JpZ2luPXtgJHt4fSwgJHt5fWB9XG4gICAgICAgICAgcm90YXRpb249e3ZlcnRpY2FsTGFiZWxSb3RhdGlvbn1cbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgeD17eH1cbiAgICAgICAgICB5PXt5fVxuICAgICAgICAgIHRleHRBbmNob3I9e3ZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9PT0gMCA/IFwibWlkZGxlXCIgOiBcInN0YXJ0XCJ9XG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvclZlcnRpY2FsTGFiZWxzKCl9XG4gICAgICAgID5cbiAgICAgICAgICB7YCR7Zm9ybWF0WExhYmVsKGxhYmVsKX0ke3hBeGlzTGFiZWx9YH1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJWZXJ0aWNhbExpbmVzID0gKHtcbiAgICBkYXRhLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodCxcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXG4gIH06IE9taXQ8XG4gICAgUGljazxcbiAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXG4gICAgICB8IFwiZGF0YVwiXG4gICAgICB8IFwid2lkdGhcIlxuICAgICAgfCBcImhlaWdodFwiXG4gICAgICB8IFwicGFkZGluZ1JpZ2h0XCJcbiAgICAgIHwgXCJwYWRkaW5nVG9wXCJcbiAgICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxuICAgID4sXG4gICAgXCJkYXRhXCJcbiAgPiAmIHsgZGF0YTogbnVtYmVyW10gfSkgPT4ge1xuICAgIGNvbnN0IHsgeUF4aXNJbnRlcnZhbCA9IDEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSldLm1hcChcbiAgICAgIChfLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPExpbmVcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICAgIHgxPXtNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHkxPXswfVxuICAgICAgICAgICAgeDI9e01hdGguZmxvb3IoXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpICogaSArXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeTI9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJWZXJ0aWNhbExpbmUgPSAoe1xuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodCxcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXG4gIH06IFBpY2s8XG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcbiAgICBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxuICA+KSA9PiAoXG4gICAgPExpbmVcbiAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XG4gICAgICB5MT17MH1cbiAgICAgIHgyPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XG4gICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cbiAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJEZWZzID0gKFxuICAgIGNvbmZpZzogUGljazxcbiAgICAgIFBhcnRpYWxCeTxcbiAgICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRcIlxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tXCJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5XCJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXRcIlxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9cIlxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XCJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcbiAgICAgID4sXG4gICAgICB8IFwid2lkdGhcIlxuICAgICAgfCBcImhlaWdodFwiXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbVwiXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9cIlxuICAgICAgfCBcInVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXRcIlxuICAgICAgfCBcImRhdGFcIlxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIlxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXRcIlxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvXCJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHlcIlxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcbiAgICA+XG4gICkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudFRvLFxuICAgICAgdXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCxcbiAgICAgIGRhdGFcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcbiAgICAgIDogMS4wO1xuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XG4gICAgICA6IDEuMDtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFwiKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50XG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxuICAgIClcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcbiAgICAgIDogMC4xO1xuXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50RnJvbSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXG4gICAgKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50RnJvbVxuICAgICAgOiBmaWxsU2hhZG93R3JhZGllbnQ7XG5cbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxuICAgIClcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5XG4gICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHk7XG5cbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XCJcbiAgICApXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XG4gICAgICA6IDA7XG5cbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRUbyA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFRvXCIpXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRUb1xuICAgICAgOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDEuMCk7XG5cbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eVwiXG4gICAgKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XG4gICAgICA6IDAuMTtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldFwiXG4gICAgKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXRcbiAgICAgIDogMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8RGVmcz5cbiAgICAgICAgPExpbmVhckdyYWRpZW50XG4gICAgICAgICAgaWQ9XCJiYWNrZ3JvdW5kR3JhZGllbnRcIlxuICAgICAgICAgIHgxPXswfVxuICAgICAgICAgIHkxPXtoZWlnaHR9XG4gICAgICAgICAgeDI9e3dpZHRofVxuICAgICAgICAgIHkyPXswfVxuICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgb2Zmc2V0PVwiMFwiXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudEZyb219XG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17ZnJvbU9wYWNpdHl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgb2Zmc2V0PVwiMVwiXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudFRvfVxuICAgICAgICAgICAgc3RvcE9wYWNpdHk9e3RvT3BhY2l0eX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxuICAgICAgICB7dXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCA/IChcbiAgICAgICAgICBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxMaW5lYXJHcmFkaWVudFxuICAgICAgICAgICAgICBpZD17YGZpbGxTaGFkb3dHcmFkaWVudEZyb21fJHtpbmRleH1gfVxuICAgICAgICAgICAgICBrZXk9e2Ake2luZGV4fWB9XG4gICAgICAgICAgICAgIHgxPXswfVxuICAgICAgICAgICAgICB5MT17MH1cbiAgICAgICAgICAgICAgeDI9ezB9XG4gICAgICAgICAgICAgIHkyPXtoZWlnaHR9XG4gICAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yID8gZGF0YXNldC5jb2xvcigxLjApIDogZmlsbFNoYWRvd0dyYWRpZW50RnJvbVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldH1cbiAgICAgICAgICAgICAgICBzdG9wQ29sb3I9e1xuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvclxuICAgICAgICAgICAgICAgICAgICA/IGRhdGFzZXQuY29sb3IoZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIDogZmlsbFNoYWRvd0dyYWRpZW50RnJvbVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5IHx8IDB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxuICAgICAgICAgICkpXG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPExpbmVhckdyYWRpZW50XG4gICAgICAgICAgICBpZD1cImZpbGxTaGFkb3dHcmFkaWVudEZyb21cIlxuICAgICAgICAgICAgeDE9ezB9XG4gICAgICAgICAgICB5MT17MH1cbiAgICAgICAgICAgIHgyPXswfVxuICAgICAgICAgICAgeTI9e2hlaWdodH1cbiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFN0b3BcbiAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudEZyb219XG4gICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgICBvZmZzZXQ9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0fVxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudFRvIHx8IGZpbGxTaGFkb3dHcmFkaWVudEZyb219XG4gICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgfHwgMH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cbiAgICAgICAgKX1cbiAgICAgIDwvRGVmcz5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdENoYXJ0O1xuIl19
