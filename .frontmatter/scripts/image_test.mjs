// https://frontmatter.codes/docs/custom-actions/sample-scripts#media-scripts
import { MediaScript } from '@frontmatter/extensibility';
import { dirname } from 'path';

(async () => {
  const mediaScriptArgs = MediaScript.getArguments();
  if (!mediaScriptArgs) {
    MediaScript.done(`No arguments found`);
    return;
  }

  const { mediaPath } = mediaScriptArgs;
  if (!mediaPath) {
    MediaScript.done(`No media path found`);
    return;
  }

  const imagemin = (await import("imagemin")).default;
  const imageminJpegtran = (await import("imagemin-jpegtran")).default;
  const imageminPngquant = (await import("imagemin-pngquant")).default;

  await imagemin([mediaPath], {
    destination: dirname(mediaPath),
    glob: false,
    plugins: [imageminJpegtran(), imageminPngquant()],
  });

  MediaScript.done(`Optimized image ${mediaPath}`);
})();