import { allProjectTrackMetadata } from 'contentlayer/generated';
import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

import {
  projectAccessOptions,
  projectDifficultyOptions,
} from '../details/types';

function parseProjectSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
}

export const ProjectsProjectMetadataDocument = defineDocumentType(() => ({
  computedFields: {
    assetsHref: {
      description: 'Link to projects assets step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/assets`,
      type: 'string',
    },
    completionHref: {
      description: 'Link to projects completion step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/completion`,
      type: 'string',
    },
    downloadDesignFileHref: {
      description: 'Link to download design files',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/download/design`,
      type: 'string',
    },
    downloadStarterFilesHref: {
      description: 'Link to download starter files',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/download/starter`,
      type: 'string',
    },
    href: {
      description: 'Link to project details page, also the brief page',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}`,
      type: 'string',
    },
    resourcesHref: {
      description: 'Link to projects resources step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/resources`,
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the project',
      resolve: (doc) => parseProjectSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
    submitHref: {
      description: 'Link to submit project',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/submit`,
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    access: {
      options: projectAccessOptions,
      required: true,
      type: 'enum',
    },
    description: {
      description: 'Short description of the project',
      required: true,
      type: 'string',
    },
    difficulty: {
      options: projectDifficultyOptions,
      required: true,
      type: 'enum',
    },
    points: {
      description: 'Reputation gained by completing the project',
      required: true,
      type: 'number',
    },
    title: {
      description: 'Title of the project',
      required: true,
      type: 'string',
    },
    track: {
      options: allProjectTrackMetadata.map((metadata) => metadata.slug),
      required: true,
      type: 'enum',
    },
  },
  filePathPattern: 'projects/project/*/*.mdx',
  name: 'ProjectMetadata',
}));
