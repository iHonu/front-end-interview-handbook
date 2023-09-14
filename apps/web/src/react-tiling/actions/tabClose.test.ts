import { describe, expect, test } from '@jest/globals';
import tabClose from './tabClose';

describe('tabClose', () => {
  describe('root level', () => {
    test('non-active tab', () => {
      expect(
        tabClose(
          {
            id: 'foo',
            type: 'item',
            activeTabId: '1',
            tabs: [
              {
                id: '1',
                closeable: true,
              },
              {
                id: '2',
                closeable: true,
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '2',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "1",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "1",
            },
          ],
          "type": "item",
        }
      `);
    });

    test('active tab', () => {
      expect(
        tabClose(
          {
            id: 'foo',
            type: 'item',
            activeTabId: '1',
            tabs: [
              {
                id: '1',
                closeable: true,
              },
              {
                id: '2',
                closeable: true,
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "2",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "2",
            },
          ],
          "type": "item",
        }
      `);
    });

    test('only tab', () => {
      expect(
        tabClose(
          {
            id: 'foo',
            type: 'item',
            activeTabId: '1',
            tabs: [
              {
                id: '1',
                closeable: true,
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "1",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "1",
            },
          ],
          "type": "item",
        }
      `);
    });
  });

  describe('deep level tab', () => {
    test('non-active tab', () => {
      expect(
        tabClose(
          {
            id: 'bar',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'foo',
                type: 'item',
                activeTabId: '1',
                tabs: [
                  {
                    id: '1',
                    closeable: true,
                  },
                  {
                    id: '2',
                    closeable: true,
                  },
                ],
              },
              {
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '2',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "1",
              "id": "foo",
              "tabs": [
                {
                  "closeable": true,
                  "id": "1",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "5",
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });

    test('active tab', () => {
      expect(
        tabClose(
          {
            id: 'bar',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'foo',
                type: 'item',
                activeTabId: '1',
                tabs: [
                  {
                    id: '1',
                    closeable: true,
                  },
                  {
                    id: '2',
                    closeable: true,
                  },
                ],
              },
              {
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "2",
              "id": "foo",
              "tabs": [
                {
                  "closeable": true,
                  "id": "2",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "5",
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });

    describe('only tab', () => {
      test('prune', () => {
        expect(
          tabClose(
            {
              id: 'bar',
              type: 'group',
              direction: 'horizontal',
              items: [
                {
                  id: 'foo',
                  type: 'item',
                  activeTabId: '1',
                  tabs: [
                    {
                      id: '1',
                      closeable: true,
                    },
                    {
                      id: '2',
                      closeable: true,
                    },
                  ],
                },
                {
                  id: 'baz',
                  type: 'item',
                  activeTabId: '5',
                  tabs: [
                    {
                      id: '5',
                      closeable: true,
                    },
                  ],
                },
              ],
            },
            {
              panelId: 'baz',
              tabId: '5',
            },
          ),
        ).toMatchInlineSnapshot(`
          {
            "activeTabId": "1",
            "id": "bar",
            "tabs": [
              {
                "closeable": true,
                "id": "1",
              },
              {
                "closeable": true,
                "id": "2",
              },
            ],
            "type": "item",
          }
        `);
      });

      test('no prune', () => {
        expect(
          tabClose(
            {
              id: 'bar',
              type: 'group',
              direction: 'horizontal',
              items: [
                {
                  id: 'foo',
                  type: 'item',
                  activeTabId: '1',
                  tabs: [
                    {
                      id: '1',
                      closeable: true,
                    },
                    {
                      id: '2',
                      closeable: true,
                    },
                  ],
                },
                {
                  id: 'baz',
                  type: 'item',
                  activeTabId: '5',
                  tabs: [
                    {
                      id: '5',
                      closeable: true,
                    },
                  ],
                },
              ],
            },
            {
              panelId: 'baz',
              tabId: '5',
            },
            false,
          ),
        ).toMatchInlineSnapshot(`
          {
            "direction": "horizontal",
            "id": "bar",
            "items": [
              {
                "activeTabId": "1",
                "id": "foo",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "1",
                  },
                  {
                    "closeable": true,
                    "id": "2",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": null,
                "id": "baz",
                "tabs": [],
                "type": "item",
              },
            ],
            "type": "group",
          }
        `);
      });
    });
  });
});
