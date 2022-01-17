import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const containerRef = useRef(null);
  const [controller,setController] = useState({
    /* ===== ACTIONS - Programmatically ===== */
      selectToolbarGroupForms: ()=>{},
    /* ===== LEFT SIDEBAR - Insertions ===== */
      insertTextField: ()=>{},
      insertCheckboxField: ()=>{},
      insertRadioField: ()=>{},
      insertDropdownField: ()=>{},
      insertSignatureField: ()=>{},
    /* ===== RIGHT SIDEBAR - Page manipulation ===== */
      currentPage: 0,
      pageCount: 0,
      goToPage: ()=>{},
    /* ===== RIGHT SIDEBAR - Element Selection ===== */
      selectedElements: [],
      deleteField: ()=>{},
  })
  const [pages,setPages] = useState([])
  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit;
    (async function() {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.load({
      // Container where PSPDFKit should be mounted.
      container,
      // The document to open.
      document: 'files/Document.pdf',
      // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
      baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
      });






      /* ===== ACTIONS - Programmatically ===== */
        function selectToolbarGroupForms(){
          instance.setViewState((viewState) => viewState.set('formDesignMode', true));
        }
        setController(baseController=>({
          ...baseController,
          selectToolbarGroupForms: selectToolbarGroupForms
        }));
      /* ===== ACTIONS - Programmatically ===== */

      /* ===== LEFT SIDEBAR - Insertions ===== */
        function insertProgrammaticallyTextField(){
          const widget = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            formFieldName: 'MyFormField-textfield',
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 100,
              top: 75,
              width: 200,
              height: 80,
            }),
          });
          const formField = new PSPDFKit.FormFields.TextFormField({
            name: 'MyFormField-textfield',
            annotationIds: new PSPDFKit.Immutable.List([widget.id]),
            value: 'Text shown in the form field',
          });
    
          instance.create([widget, formField]);
        }
        setController(baseController=>({
          ...baseController,
          insertTextField: insertProgrammaticallyTextField
        }));
        function insertProgrammaticallyCheckboxField(){// Create two radio buttons and position them in the document.
          // Note that both widget annotations have the same `formFieldName` value.
          const checkWidget = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            formFieldName: 'MyFormField-checkbox',
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 100,
              top: 200,
              width: 20,
              height: 20,
            }),
          });
          const formField = new PSPDFKit.FormFields.CheckBoxFormField({
            name: 'MyFormField-checkbox',
            annotationIds: new PSPDFKit.Immutable.List([
              checkWidget.id,
            ]),
            options: new PSPDFKit.Immutable.List([
              new PSPDFKit.FormOption({
                label: 'Option 1',
                value: '1',
              }),
            ]),
            defaultValue: '1',
          });
          instance.create([checkWidget, formField]);
        }
        setController(baseController=>({
          ...baseController,
          insertCheckboxField: insertProgrammaticallyCheckboxField
        }));
        function insertProgrammaticallyRadioField(){
          // Create two radio buttons and position them in the document.
          // Note that both widget annotations have the same `formFieldName` value.
          const radioWidget1 = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            formFieldName: 'MyFormField-radio',
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 200,
              top: 200,
              width: 20,
              height: 20,
            }),
          });
          const formField = new PSPDFKit.FormFields.RadioButtonFormField({
            name: 'MyFormField-radio',
            annotationIds: new PSPDFKit.Immutable.List([
              radioWidget1.id,
            ]),
            options: new PSPDFKit.Immutable.List([
              new PSPDFKit.FormOption({
                label: 'Option 1',
                value: '1',
              }),
            ]),
            defaultValue: '1',
          });
          instance.create([radioWidget1, formField]);
        }
        setController(baseController=>({
          ...baseController,
          insertRadioField: insertProgrammaticallyRadioField
        }));
        function insertProgrammaticallyDropdownField(){
          const widget = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            formFieldName: 'MyFormField-dropdown',
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 350,
              top: 100,
              width: 150,
              height: 60,
            }),
          });
          const formField = new PSPDFKit.FormFields.ComboBoxFormField({
            name: 'MyFormField-dropdown',
            annotationIds: new PSPDFKit.Immutable.List([widget.id]),
            values: new PSPDFKit.Immutable.List(['orange']), // initially selected value(s)
            options: new PSPDFKit.Immutable.List([
              // Available values.
              new PSPDFKit.FormOption({ label: 'Apple', value: 'apple' }),
              new PSPDFKit.FormOption({ label: 'Banana', value: 'banana' }),
              new PSPDFKit.FormOption({ label: 'Orange', value: 'orange' }),
            ]),
          });
          instance.create([widget, formField]);
        }
        setController(baseController=>({
          ...baseController,
          insertDropdownField: insertProgrammaticallyDropdownField
        }));
        async function insertProgrammaticallySignatureField(){
          const widget = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 200,
              top: 300,
              width: 150,
              height: 75,
            }),
            formFieldName: 'my signature form field',
          });
          const formField = new PSPDFKit.FormFields.SignatureFormField({
            name: 'my signature form field',
            annotationIds: new PSPDFKit.Immutable.List([widget.id]),
          });
          await instance.create([widget, formField]);
        }
        setController(baseController=>({
          ...baseController,
          insertSignatureField: insertProgrammaticallySignatureField
        }));
      /* ===== LEFT SIDEBAR - Insertions ===== */

      /* ===== RIGHT SIDEBAR - Page manipulation ===== */
        async function StartPages(){
          const currentPage = instance.viewState.currentPageIndex
          const pageCount = instance.totalPageCount
          for (let pageNumber = 0; pageNumber < pageCount; pageNumber++) {
            const thumbnail = await instance.renderPageAsImageURL({
              width: 50
            },pageNumber)
            setPages(basePages=>([
              ...basePages,
              {
                thumbnail: thumbnail,
                number: pageNumber,
              }
            ]))
          }
          setController(baseController=>({
            ...baseController,
            currentPage,
            pageCount,
          }));
        }
        StartPages()
        function setCurrentPageNumber(pageNumber){
          const state = instance.viewState;
          const newState = state.set("currentPageIndex", pageNumber);
          instance.setViewState(newState);
        }
        setController(baseController=>({
          ...baseController,
          goToPage: setCurrentPageNumber
        }));
        instance.addEventListener("viewState.currentPageIndex.change",()=>{
          const currentPage = instance.viewState.currentPageIndex
          setController(baseController=>({
            ...baseController,
            currentPage,
          }));
        })
      /* ===== RIGHT SIDEBAR - Page manipulation ===== */

      /* ===== RIGHT SIDEBAR - Element Selection ===== */
        // https://pspdfkit.com/api/web/PSPDFKit.Instance.html#addEventListener
        instance.addEventListener("annotationSelection.change", function (annotation) {
          if (annotation) {
            const selectedAnnotation = annotation
            const selectedAnnots = [
              {
                ...selectedAnnotation,
                Id: selectedAnnotation.id,
                getFormFieldPlaceHolderType: ()=>'type...',
                formFieldName: selectedAnnotation.formFieldName
              }
            ];
            setController(baseController=>({
              ...baseController,
              selectedElements: selectedAnnots
            }));
          } else {
            setController(baseController=>({
              ...baseController,
              selectedElements: []
            }));
          }
        });
        async function deleteField(annotation){
          const formFields = await instance.getFormFields();
          const formField = formFields.find(
            (formField) => formField.name === annotation.formFieldName,
          );
          await instance.delete(formField);
        }
        setController(baseController=>({
          ...baseController,
          deleteField: deleteField
        }));
      /* ===== RIGHT SIDEBAR - Element Selection ===== */



    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);
  return (
    <div className="App">
      <div className="actions">
        <button type="button" onClick={controller.selectToolbarGroupForms}>Select Forms</button>
      </div>
      <div className="interface">
        <div className="left-sidebar">
          <button type="button" onClick={controller.insertTextField}>Textbox</button><br />
          <button type="button" onClick={controller.insertCheckboxField}>Checkbox</button><br />
          <button type="button" onClick={controller.insertDropdownField}>Dropdown</button><br />
          <button type="button" onClick={controller.insertRadioField}>Radio button</button><br />
          <button type="button" onClick={controller.insertSignatureField}>Signature</button><br />
        </div>
        <div className="webviewer" ref={containerRef}></div>
        <div className="right-sidebar">
          {controller.selectedElements.length<1?(
            <div className="page-manipulation">
              <h2>Form details</h2>
              <p>Viewing: Page {controller.currentPage+1} of {controller.pageCount}</p>
              <ul>
                {
                  pages.map(page=>(<li key={page.number}>
                    <button type="button" onClick={()=>controller.goToPage(page.number)}>
                      <img src={page.thumbnail} width="50px" alt={`Page ${page.number}`} />
                    </button>
                  </li>
                  ))
                }
              </ul>
            </div>
          ):(
            <div className="element-selection">
              {controller.selectedElements.map(annotation=>(<span key={annotation.Id}>
                {/* https://www.pdftron.com/api/web/Core.Annotations.Annotation.html */}
                {/* https://www.pdftron.com/api/web/Core.Annotations.Forms.FieldManager.html#main */}
                <h2>{annotation.getFormFieldPlaceHolderType()}</h2>
                <button type="button" onClick={()=>controller.deleteField(annotation)}>Remove</button>
                <p>Required:</p>
                <p>Field name:</p>
                <p>Helper:</p>
              </span>))}
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
      <button type="button">Upload</button>
      </div>
    </div>
  );
}

export default App;
