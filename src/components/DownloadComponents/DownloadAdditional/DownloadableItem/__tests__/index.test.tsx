import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import DownloadableItem from '..';
import { createNodeReleasesData } from '../../../../../__fixtures__/page';
import { getDownloadableItemsList } from '../downloadItems';

describe('DownloadableItem component', (): void => {
  const releaseData = createNodeReleasesData();
  const downloadableItem = getDownloadableItemsList(
    releaseData[0].fullVersion
  )[0];

  it('renders correctly with downloadable item', (): void => {
    const { container } = render(
      <DownloadableItem
        item={downloadableItem}
        isExpanded={false}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setExpandedItem={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with expanded state', (): void => {
    const { container } = render(
      <DownloadableItem
        item={downloadableItem}
        isExpanded
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setExpandedItem={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('calls callback with correct item name onclick when not expanded', async () => {
    const setExpendedItemSpy = jest
      .fn()
      .mockImplementation(itemName => itemName);

    const { container } = render(
      <DownloadableItem
        item={downloadableItem}
        isExpanded={false}
        setExpandedItem={setExpendedItemSpy}
      />
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(container).toMatchSnapshot();

    expect(setExpendedItemSpy).toHaveBeenCalledTimes(1);
    expect(setExpendedItemSpy).toHaveBeenCalledWith(downloadableItem.name);
  });

  it('calls callback with empty item name onclick when expanded', async () => {
    const setExpendedItemSpy = jest
      .fn()
      .mockImplementation(itemName => itemName);

    const { container } = render(
      <DownloadableItem
        item={downloadableItem}
        isExpanded
        setExpandedItem={setExpendedItemSpy}
      />
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(container).toMatchSnapshot();

    expect(setExpendedItemSpy).toHaveBeenCalledTimes(1);
    expect(setExpendedItemSpy).toHaveBeenCalledWith('');
  });
});
