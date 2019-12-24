import * as path from 'path';
import * as fs from 'fs';
import {Config} from '../common/config/private/Config';

class ProjectPathClass {
  public Root: string;
  public ImageFolder: string;
  public ThumbnailFolder: string;
  public TranscodedFolder: string;
  public FacesFolder: string;
  public FrontendFolder: string;

  constructor() {
    this.reset();
  }

  normalizeRelative(pathStr: string) {
    return path.join(pathStr, path.sep);
  }

  getAbsolutePath(pathStr: string): string {
    return path.isAbsolute(pathStr) ? pathStr : path.join(this.Root, pathStr);
  }

  getRelativePathToImages(pathStr: string): string {
    return path.relative(this.ImageFolder, pathStr);
  }

  reset() {
    this.Root = path.join(__dirname, '/../../');
    this.FrontendFolder = path.join(this.Root, 'dist');
    this.ImageFolder = this.getAbsolutePath(Config.Server.Media.folder);
    this.ThumbnailFolder = this.getAbsolutePath(Config.Server.Media.tempFolder);
    this.TranscodedFolder = path.join(this.ThumbnailFolder, 'tc');
    this.FacesFolder = path.join(this.ThumbnailFolder, 'f');

    // create thumbnail folder if not exist
    if (!fs.existsSync(this.ThumbnailFolder)) {
      fs.mkdirSync(this.ThumbnailFolder);
    }

  }
}

export const ProjectPath = new ProjectPathClass();
