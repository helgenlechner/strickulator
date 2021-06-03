import * as React from 'react';
import { connect } from 'react-redux';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { LineDash } from '../../../components/canvas/LineDash';
import { Polygon } from '../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { CanvasContext } from '../../../context/canvas.context';
import { Text } from '../../../components/canvas/Text';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import {
  leftHalfOfPattern,
  leftMargin,
  lineHeight,
  rightMargin,
  topMargin,
} from '../custom.model';
import {
  getBottomWidth,
  getHeight,
  getNeckCurve,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getTopWidth,
} from '../store/custom.roundNeck.selectors';
import { UnevenSlope } from '../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  neckCurve: UnevenSlope['pattern'] | undefined;
  widthOfOneStitch: number | undefined;
  heightOfOneRow: number | undefined;
}

const mapStateToProps = (state: AppState, props: Props): ConnectedState => ({
  bottomWidth: getBottomWidth(state, props),
  topWidth: getTopWidth(state, props),
  height: getHeight(state, props),
  numberOfBottomStitches: getNumberOfBottomStitches(state, props),
  numberOfTopStitches: getNumberOfTopStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
  neckCurve: getNeckCurve(state, props),
  widthOfOneStitch: getWidthOfOneStitch(state, props),
  heightOfOneRow: getHeightOfOneRow(state, props),
});

const RoundNeckPreview_: React.FC<Props & ConnectedState> = ({
  bottomWidth = 0,
  topWidth = 0,
  height = 0,
  numberOfBottomStitches,
  numberOfTopStitches,
  numberOfRows,
  neckCurve,
  widthOfOneStitch = 0,
  heightOfOneRow = 0,
}) => {
  const [canvasRef, setCanvasRef] =
    React.useState<HTMLCanvasElement | null>(null);
  const [containerWidth, setContainerWidth] =
    React.useState<number | undefined>(undefined);

  if (bottomWidth === 0 || topWidth === 0 || height === 0 || !neckCurve) {
    return null;
  }

  const onContainerRefChange = (ref: HTMLDivElement | null) => {
    if (!ref || containerWidth !== undefined) {
      return;
    }

    setContainerWidth(Math.min(ref.clientWidth, 600));
  };

  const scaleFactor =
    ((containerWidth ?? 600) - leftMargin - rightMargin) /
    (Math.max(bottomWidth, topWidth) / 2);

  const canvasHeight = height * scaleFactor + 22;

  const previewBottomWidth = (bottomWidth * scaleFactor) / 2;
  const previewTopWidth = topWidth * scaleFactor;
  const previewHeight = height * scaleFactor;

  let neckCurveDecreasesSoFar = 0;

  return (
    <div ref={onContainerRefChange}>
      <canvas
        ref={setCanvasRef}
        width={containerWidth ?? 600}
        height={canvasHeight}
      />
      <CanvasContext.Provider value={canvasRef?.getContext('2d') ?? undefined}>
        <ClearRect width={containerWidth ?? 600} height={canvasHeight} />
        <BasicSetup />
        <StrokeStyle value="#aeb2b7" />
        <LineDash value={[10, 4]} />
        <Polygon
          points={[
            { x: leftHalfOfPattern + leftMargin, y: topMargin },
            { x: leftHalfOfPattern + leftMargin, y: previewHeight + topMargin },
          ]}
        />
        <StrokeStyle value="#242f40" />
        <LineDash value={[]} />
        <Polygon
          points={[
            {
              x:
                leftMargin +
                leftHalfOfPattern +
                (previewBottomWidth - previewTopWidth),
              y: topMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern + leftMargin,
              y: topMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern + leftMargin,
              y: previewHeight + topMargin,
            },
            { x: 10 + leftMargin, y: previewHeight + topMargin },
            { x: leftHalfOfPattern + leftMargin, y: previewHeight + topMargin },
            ...Object.entries(neckCurve).map(([row, decrease]) => {
              const y = Math.max(
                previewHeight +
                  topMargin -
                  Number(row) * scaleFactor * heightOfOneRow,
                topMargin,
              );

              const points = [
                {
                  x:
                    leftHalfOfPattern +
                    leftMargin +
                    neckCurveDecreasesSoFar * scaleFactor * widthOfOneStitch,
                  y,
                },
                {
                  x:
                    leftHalfOfPattern +
                    leftMargin +
                    (decrease + neckCurveDecreasesSoFar) *
                      scaleFactor *
                      widthOfOneStitch,
                  y,
                },
              ];

              neckCurveDecreasesSoFar += decrease;

              return points;
            }),
          ].flat()}
          closePath={true}
        />
        <ArrowHead x={4 + leftMargin} y={previewHeight + topMargin} />
        <Text
          content={`${numberOfRows}\u202fR`}
          x={leftMargin / 2}
          y={canvasHeight / 2 - lineHeight}
          maxWidth={leftMargin}
        />
        <Text
          content={`${height}\u202fcm`}
          x={leftMargin / 2}
          y={canvasHeight / 2}
          maxWidth={leftMargin}
        />
        <Text
          content={`${numberOfBottomStitches}\u00d72 = ${bottomWidth}\u202fcm`}
          x={leftMargin + leftHalfOfPattern + previewBottomWidth / 2}
          y={canvasHeight - lineHeight}
        />
        <Text
          content={`${numberOfTopStitches} = ${topWidth}\u202fcm`}
          x={
            leftMargin +
            leftHalfOfPattern +
            previewTopWidth / 2 +
            (previewBottomWidth - previewTopWidth)
          }
          y={topMargin + lineHeight + 4}
        />
      </CanvasContext.Provider>
    </div>
  );
};

export const RoundNeckPreview = connect(mapStateToProps)(RoundNeckPreview_);
