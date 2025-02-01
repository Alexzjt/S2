/**
 * @description spec for issue #3087
 * https://github.com/antvis/S2/issues/3087
 */
import { TableSheet } from '../../src';
import { getContainer } from '../util/helpers';

const data = Array(100).fill({
  province: 'aaaa'.repeat(100),
  city: 'aa',
});

describe('Table MaxLines Tests', () => {
  test('should render maxLines text correctly after render twice', async () => {
    const tableSheet = new TableSheet(
      getContainer(),
      {
        fields: {
          columns: ['province', 'city'],
        },
        meta: [
          {
            field: 'province',
            name: '省份',
          },
          {
            field: 'city',
            name: '城市',
          },
        ],
        data,
      },
      {
        width: 600,
        height: 480,
        style: {
          colCell: {
            maxLines: 3,
            wordWrap: true,
            textOverflow: 'ellipsis',
          },
          dataCell: {
            maxLines: 3,
            wordWrap: true,
            textOverflow: 'ellipsis',
          },
        },
      },
    );

    await tableSheet.render();
    const actualText1 = tableSheet.facet.getDataCells()[0].getActualText();

    await tableSheet.render();
    const actualText2 = tableSheet.facet.getDataCells()[0].getActualText();

    expect(actualText1).toEqual(actualText2);
  });
});
