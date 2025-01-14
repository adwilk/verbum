/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import type { EditorConfig, LexicalNode, NodeKey } from 'lexical';

import SerializedTextNode from 'lexical';

import { Spread } from 'globals';
import { TextNode } from 'lexical';

export type SerializedEmojiNode = Spread<
  {
    className: string;
    type: 'emoji';
  },
  typeof SerializedTextNode
>;

let __className: string = 'EmojiNode';
export class EmojiNode extends TextNode {
  static getType(): string {
    return 'emoji';
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(__className, node.__text, node.__key);
  }

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key);
    __className = className;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('span');
    const inner = super.createDOM(config);
    dom.className = __className;
    inner.className = 'emoji-inner';
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode(
      serializedNode.className,
      serializedNode.text
    );
    node.setFormat(serializedNode.format);
    // node.setDetail(serializedNode.detail); //FIXME: açılacak
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  // exportJSON(): SerializedEmojiNode {
  //   return {
  //     // ...super.exportJSON(), //FIXME: açılacak
  //     className: this.getClassName(),
  //     type: "emoji",
  //   };
  // }

  // getClassName(): string {
  //   const self = this.getLatest<EmojiNode>();
  //   return self.__className;
  // } //FIXME: açılacak
}

export function $isEmojiNode(
  node: LexicalNode | null | undefined
): node is EmojiNode {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(
  className: string,
  emojiText: string
): EmojiNode {
  return new EmojiNode(className, emojiText).setMode('token');
} //FIXME: açılacak
