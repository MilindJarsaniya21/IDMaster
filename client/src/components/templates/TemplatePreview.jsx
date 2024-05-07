import { useEffect } from "react";
import PropTypes from "prop-types";

import Card from "../ui/Card";

const updateSvgContent = (svgContent, userData) => {
  let updatedSvgContent = svgContent;
  updatedSvgContent = updatedSvgContent.replace(
    /{{name}}/g,
    userData.name || ""
  );
  updatedSvgContent = updatedSvgContent.replace(
    /{{email}}/g,
    userData.email || ""
  );
  updatedSvgContent = updatedSvgContent.replace(
    /{{phone}}/g,
    userData.phone || ""
  );
  updatedSvgContent = updatedSvgContent.replace(
    /{{address}}/g,
    userData.address || ""
  );

  // Split the URL by '/' to get the parts of the URL
  let urlParts = userData.idImage.split("/");

  // Find the index of 'upload' in the URL parts
  let uploadIndex = urlParts.indexOf("upload");

  // Insert 'a_180' after 'upload' in the URL parts
  urlParts.splice(uploadIndex + 1, 0, "a_180");

  // Join the URL parts back together to get the rotated image URL
  let rotatedImageUrl = urlParts.join("/");

  // Replace the {{idImage}} placeholder with the rotated image URL
  updatedSvgContent = updatedSvgContent.replace(
    /{{idImage}}/g,
    rotatedImageUrl || ""
  );

  return updatedSvgContent;
};
function TemplatePreview({
  templates,
  selectedTemplate,
  userData,
  svgContent,
  setSvgContent,
  svgRef,
}) {
  // console.log(props);

  useEffect(() => {
    const template = templates.find(
      (template) => template.id === selectedTemplate
    );

    if (template) {
      const svgContent = updateSvgContent(
        template.content,
        userData.idCardCredential
      );
      setSvgContent(svgContent);
    }
  }, [selectedTemplate, templates, userData.idCardCredential, setSvgContent]);
  return (
    <Card>
      <div
        className="rounded-md"
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </Card>
  );
}

TemplatePreview.propTypes = {
  templates: PropTypes.array.isRequired,
  selectedTemplate: PropTypes.number.isRequired,
  userData: PropTypes.object.isRequired,
  svgContent: PropTypes.string.isRequired,
  setSvgContent: PropTypes.func.isRequired,
  svgRef: PropTypes.object.isRequired,
};

export default TemplatePreview;
