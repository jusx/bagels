# Properties

| Name | Description | Required | Implemented |
| ---- | ----------- | --- |
| selector | the css selector of the DOM where bagel should be rendered. | Yes | Yes|
| percent | A valid integer from 0 to 100. A valid percentage value. | Yes | Yes |
| middleLabel | Label for the middle of the chart | No | No
| bottomLabel | Label for the bottom of the chart | No | Yes
| image | Image (PNG, JPG, etc) to display in the middle of the chart. | No | No
| svg | ID to the svg to be rendered in the middle of the chart. If both image and svg is defined, svg is used. | No | No
| levelFunction | The function used to calculate performance level. Must return a valid json | No | No
