import './style.css';

import * as Models from './model';

import React, { Component } from 'react';

import { getClasses } from '../../test';

// import { withTranslation } from 'react-i18next';

// import { getClasses, loadingPanel } from '../../../Shared/Utilities/ChConfigUtility';

// import { PDFExport } from '@progress/kendo-react-pdf';
// import { PdfTemplate as Template } from './PdfTemplate';
// import { cloneDeep } from 'lodash';
// import { getDMXReportData } from './Service';

// import { getDMXReport } from './Service'

// const LDRReportImageURL = `mycrestron-portal-media/Images/Module-images/LDR-Images/`;


const LDRReportImageURL = '';
class DMXReport extends Component<any, any> {
  DMXReportComponent: any;

  constructor(props: any) {
    super(props);
    this.state = {
      DMXReportData: Models.DMXMockData,
      systemConfiguration: Models.DMXMockData.SystemDetails
    };
    // this.DMXReportComponent = React.createRef<div>();
  }

  // componentDidMount = () => {
  //   this.initData();
  // };

  // initData = () => {
  //   // let res = await getDMXReportData(this.props.systemId);
  //   let res = Models.DMXMockData;
  //   this.setState({
  //     DMXReportData: res,
  //     systemConfiguration: res.SystemDetails
  //   });
  //   this.props.stopLoading();
  // };

  GetDMXModuleRowAndCol(
    RailNumber: any,
    ColumnCount: any,
    SlotNo: any,
    SlotRange: any,
    ModuleTypeName: any
  ) {
    let ModuleDINSlotRow = [];

    let columnNumber = [];
    let startingcol = (RailNumber - 1) * ColumnCount + 1;
    let occupiedColumn = [];

    for (let i = SlotNo; i < SlotNo + parseInt(SlotRange); i++) {
      occupiedColumn.push(i);
    }

    for (let j = startingcol; j < startingcol + ColumnCount; j++) {
      if (occupiedColumn.indexOf(j) >= 0) {
        columnNumber.push({
          SlotNo: j,
          OccupiedSlot: true,
          AvailableSlot: false,
          AllocatebleSlot: false
        });
      } else {
        columnNumber.push({
          SlotNo: j,
          OccupiedSlot: false,
          AvailableSlot: true,
          AllocatebleSlot: false
        });
      }
    }

    ModuleDINSlotRow.push({
      Row: RailNumber,
      ColumnCount: columnNumber,
      AssignedColumn: [] as any[]
    });

    for (let b = 0; b < ModuleDINSlotRow[0].ColumnCount.length; b++) {
      if (occupiedColumn.indexOf(ModuleDINSlotRow[0].ColumnCount[b].SlotNo) >= 0) {
        (ModuleDINSlotRow[0].AssignedColumn as any).push({
          SlotNo: ModuleDINSlotRow[0].ColumnCount[b].SlotNo,
          startSlot: occupiedColumn[0],
          endSlot: occupiedColumn[occupiedColumn.length - 1],
          Occupied: true,
          Width: (occupiedColumn[occupiedColumn.length - 1] - occupiedColumn[0] + 1) * 19.5 + 'px',
          ModuleType: ModuleTypeName
        });

        b = b + (occupiedColumn[occupiedColumn.length - 1] - occupiedColumn[0]);
      } else {
        (ModuleDINSlotRow[0].AssignedColumn as any).push({
          SlotNo: ModuleDINSlotRow[0].ColumnCount[b].SlotNo,
          startSlot: 0,
          endSlot: 0,
          Occupied: false,
          Width: '18px',
          ModuleType: null
        });
      }
    }
    return ModuleDINSlotRow;
  }

  render() {
    console.log(this.props);
    // const { t } = this.props;

    const t = (data: any) => {
      return data;
    };

    // let DMXReportModel = cloneDeep(this.state.DMXReportData);
    let DMXReportModel = this.state.DMXReportData;

    let systemData = this.state.SystemDetails;
    let header = '';
    if (systemData) {
      header = `Project: ${systemData.SystemName} | Address: ${
        systemData.SystemAddressSingleLine ? systemData.SystemAddressSingleLin : ' '
      }`;
      if (header.length > 145) {
        header = header.substring(0, 145) + '...';
      }
    }
    // return <div>Hello</div>;
    return (
      <>
        <div
          id="chc-report-DMX-Report"
          className="chc-reportt-header-bg row card-header"
          style={{ height: '54px' }}>
          <div className="col col col-lg-2 col col-md-2 col col-sm-3 col col-xs-3 mt-2">
            <input
              type="text"
              className="form-control"
              style={{ width: '150' }}
              id="chc-report-lsrreport-revision"
              placeholder="Revision number"
              autoFocus
              maxLength={32}
              onChange={(e: any) =>
                this.setState({
                  revisionNumber: e.target.value
                })
              }
            />
          </div>
          <div className="col col col-lg-3 col col-md-5 col col-sm-4 col col-xs-4 mt-1">
            <button
              className="saveandnect-btn chc-reports-exportToPDF-btn crestron-default-btn btn btn-primary"
              style={{ float: 'left', width: 'auto', marginLeft: '10px' }}
              onClick={() =>
                this.props.handleExportToPDF('chc-report-dmx-tab', this.DMXReportComponent)
              }>
              <span className="file-export-icon"></span> Export to PDF
            </button>
          </div>
        </div>

        <div
          id="chc-report-dmx-tab"
          className="form-horizontal reportTab-height px-3 chc-customCol-pLpR-15">
          <div className="pdf-header row" style={{ marginBottom: '20px', marginTop: '0px' }}>
            <div className="col-6 col-xs-12" style={{ paddingLeft: '0px' }}>
              <img
                className="chc-report-invoice-number"
                src={`mycrestron-portal-media/Images/crestron-logo-blacknew.png`}
                alt="logo"
              />
            </div>
            <div
              className="col-6 col-xs-12 d-flex align-items-center"
              style={{ paddingRight: '0px' }}>
              <span className="Report-header-text ms-auto">DMX-C Report</span>
            </div>
          </div>
          <div
            className="pdf-body"
            style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif' }}>
            <div className="col col-lg-12" style={{ justifyContent: 'center' }}>
              <div className="col col-xs-12 col-md-12">
                {DMXReportModel.ReportDataUI?.map((reportData: any, key1: any) => {
                  return (
                    <React.Fragment key={key1}>
                      <div className="row">
                        {reportData.ModuleOutputNo === '1' && (
                          <div
                            className="col col-lg-12 col-md-12 col-sm-12"
                            style={{
                              marginTop: key1 > 0 ? '30px' : '0px',
                              marginBottom: key1 > 0 ? '30px' : '0px'
                            }}>
                            <div
                              className="chc-report-header-secondary col-lg-12 col-md-12 col-sm-12 col-xs-12"
                              style={{ paddingLeft: ' 0px', paddingRight: ' 0px' }}>
                              <div
                                className="col col-xs-12 mar-table-top"
                                style={{ paddingLeft: '0px' }}>
                                <div style={{ marginTop: '0px' }}>
                                  <div className="row">
                                    <div className="col col-md-6">
                                      <div className="col col-xs-6" style={{ paddingRight: '0px' }}>
                                        <span
                                          style={{
                                            fontWeight: 'bold',
                                            fontSize: '17px',
                                            color: '#1F1F1F'
                                          }}>
                                          {reportData.HeaderModuleName}
                                        </span>
                                      </div>
                                      <div
                                        className="col col-xs-6 col-md-6 reportPDFInfo"
                                        style={{ paddingLeft: ' 3px' }}>
                                        <div
                                          className="row form-group"
                                          style={{ marginBottom: '0px' }}>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <label
                                              className="custom-label"
                                              style={{ width: 'auto' }}>
                                              Room:
                                            </label>
                                          </div>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <span
                                              id="mycres-pwr-systemname"
                                              className="chc-report-header-custom-span"
                                              style={{ width: '270px', whiteSpace: 'nowrap' }}>
                                              {reportData.RoomName}
                                            </span>
                                          </div>
                                        </div>

                                        <div
                                          className="row form-group"
                                          style={{ marginBottom: '0px' }}>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <label
                                              className="custom-label"
                                              style={{ width: 'auto' }}>
                                              Enclosure:
                                            </label>
                                          </div>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <span
                                              id="mycres-pwr-customeraddress"
                                              className="chc-report-header-custom-span"
                                              style={{ width: '270px', whiteSpace: 'nowrap' }}>
                                              {reportData.EnclosureName}
                                            </span>
                                          </div>
                                        </div>

                                        <div
                                          className="row form-group"
                                          style={{ marginBottom: '0px' }}>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <label
                                              className="custom-label"
                                              style={{ width: 'auto' }}>
                                              Enclosure Model:
                                            </label>
                                          </div>
                                          <div className="col col-xs-6 col-xs-6 LDR-report-header-DIN-leftside">
                                            <span
                                              id="mycres-pwr-customeraddress"
                                              className="chc-report-header-custom-span"
                                              style={{ width: '270px' }}>
                                              {reportData.EnclosureModel}
                                            </span>
                                          </div>
                                        </div>

                                        <div
                                          className="row form-group"
                                          style={{ marginBottom: '0px' }}>
                                          <div className="col col-xs-3 LDR-report-header-DIN-leftside">
                                            <label
                                              className="custom-label"
                                              style={{ width: 'auto' }}>
                                              Rail:
                                            </label>
                                          </div>
                                          <div className="col col-xs-3 LDR-report-header-DIN-leftside">
                                            <span
                                              id="mycres-pwr-customeraddress"
                                              className="chc-report-header-custom-span"
                                              style={{ width: '270px' }}>
                                              {reportData.RailNumber}
                                            </span>
                                          </div>
                                        </div>

                                        <div
                                          className="row form-group"
                                          style={{ marginBottom: '0px' }}>
                                          <div className="col col-xs-3 LDR-report-header-DIN-leftside">
                                            <label
                                              className="custom-label"
                                              style={{ width: 'auto' }}>
                                              Slot(s):
                                            </label>
                                          </div>
                                          <div className="col col-xs-3 LDR-report-header-DIN-leftside">
                                            <span
                                              id="mycres-pwr-customeraddress"
                                              className="chc-report-header-custom-span"
                                              style={{ width: '270px' }}>
                                              {reportData.DinSlot}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col col-md-6">
                                      <div
                                        className="col col-xs-6"
                                        style={{ paddingRight: ' 0px', paddingLeft: ' 0px' }}>
                                        <div className="col col-xs-6">
                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col-6">
                                              <span
                                                className="custom-label ps-2"
                                                style={{
                                                  marginBottom: '0px',
                                                  fontWeight: 'bold',
                                                  fontSize: '17px',
                                                  color: '#1F1F1F',
                                                  width: 'auto'
                                                }}>
                                                Serial Number:
                                              </span>
                                            </div>
                                            <div className="col-6">
                                              <span
                                                id="mycres-pwr-customeraddress"
                                                className="chc-report-header-custom-span"
                                                style={{
                                                  marginBottom: '0px',
                                                  fontWeight: 'bold',
                                                  fontSize: ' 17px',
                                                  color: '#1F1F1F',
                                                  width: '270px'
                                                }}>
                                                {reportData.SerialNumber}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className="col col-xs-6 col-md-6 reportPDFInfo"
                                          style={{ paddingLeft: ' 10px' }}>
                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <label
                                                className="custom-label"
                                                style={{ width: 'auto' }}>
                                                Module Model:
                                              </label>
                                            </div>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <span
                                                className="chc-report-header-custom-span"
                                                style={{ width: '270px' }}>
                                                {reportData.ModuleTypeName}
                                              </span>
                                            </div>
                                          </div>

                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <label
                                                className="custom-label"
                                                style={{ width: 'auto' }}>
                                                Outputs Used / Total:
                                              </label>
                                            </div>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <span
                                                className="custom-span"
                                                style={{ width: '270px' }}>
                                                {reportData.UsedOutputs +
                                                  ' / ' +
                                                  reportData.TotalOutputs}
                                              </span>
                                            </div>
                                          </div>

                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <label
                                                className="custom-label"
                                                style={{ width: 'auto' }}>
                                                Channels Used / Remaining:
                                              </label>
                                            </div>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <span
                                                className="custom-span"
                                                style={{ width: '270px' }}>
                                                {reportData.ChannelUsed +
                                                  ' / ' +
                                                  reportData.ChannelsRemaining}
                                              </span>
                                            </div>
                                          </div>

                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <label
                                                className="custom-label"
                                                style={{ width: 'auto' }}>
                                                Total Fixtures:
                                              </label>
                                            </div>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <span
                                                className="custom-span"
                                                style={{ width: '270px' }}>
                                                {reportData.TotalFixtures}
                                              </span>
                                            </div>
                                          </div>

                                          <div
                                            className="row form-group"
                                            style={{ marginBottom: '0px' }}>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <label
                                                className="custom-label"
                                                style={{ width: 'auto' }}>
                                                Total Wattage:
                                              </label>
                                            </div>
                                            <div className="col col-xs-6 LDR-report-header-DIN-rightside">
                                              <span
                                                className="custom-span"
                                                style={{ width: '270px' }}>
                                                {reportData.TotalWattages}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col col-xs-12">
                                    <div style={{ paddingLeft: ' 0px', margin: 'auto' }}>
                                      {this.GetDMXModuleRowAndCol(
                                        reportData.RailNumber,
                                        reportData.Cols,
                                        reportData.SlotNo,
                                        reportData.SlotRange,
                                        reportData.ModuleTypeName
                                      ).map((row: any, key2: any) => {
                                        return (
                                          <div key={key2}>
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td className="Header-PWR-tableRailNumber">
                                                    <span className="Header-PWR-railNumberCircle binding">
                                                      {row.Row}
                                                    </span>
                                                  </td>
                                                  <td className="HeaderSlotNo-slotCont">
                                                    <div className="Header-PWR-slotNo-Container float-start mb-0">
                                                      <table
                                                        className="Header-PWR-tableSeprate-DIN-slotNo"
                                                        style={{ border: '1' }}>
                                                        <tbody>
                                                          <tr>
                                                            {row.ColumnCount.map(
                                                              (col: any, key3: any) => {
                                                                return (
                                                                  <td
                                                                    key={key3}
                                                                    id={`Enclosure_Layout_Slot_${col.SlotNo}`}
                                                                    style={
                                                                      col.OccupiedSlot
                                                                        ? {
                                                                            backgroundColor:
                                                                              'black',
                                                                            color: 'white'
                                                                          }
                                                                        : {
                                                                            backgroundColor: 'none',
                                                                            color: 'black'
                                                                          }
                                                                    }
                                                                    className="Header-PWR-DIN-En-slotNo-td">
                                                                    <span>{col.SlotNo}</span>
                                                                  </td>
                                                                );
                                                              }
                                                            )}
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                    <div
                                                      className="Header-PWR-DeviceBG-Container"
                                                      style={{
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: 'max-content'
                                                      }}>
                                                      <table className="Header-PWR-DeviceBGTable">
                                                        <tbody>
                                                          <tr>
                                                            <td className="Header-PWR-DeviceBGTable-topHeight"></td>
                                                          </tr>
                                                          <tr>
                                                            <td className="Header-PWR-DeviceBGTable-middleHeight"></td>
                                                          </tr>
                                                          <tr>
                                                            <td className="Header-PWR-DeviceBGTable-bottomHeight"></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table className="Header-PWR-tableSeprate">
                                                        <tbody>
                                                          <tr
                                                            style={{
                                                              height: '24px',
                                                              width: 'auto'
                                                            }}>
                                                            {row.AssignedColumn.map(
                                                              (col: any, key3: any) => {
                                                                return (
                                                                  <td
                                                                    key={key3}
                                                                    className={
                                                                      col.Occupied === false
                                                                        ? 'DIN-table-td'
                                                                        : 'PWR-EditSlotStatus'
                                                                    }
                                                                    style={{
                                                                      height: '48px',
                                                                      width: `${col.Width}`,
                                                                      textAlign: 'center'
                                                                    }}>
                                                                    <span
                                                                      style={{
                                                                        width: `${col.Width}`
                                                                      }}>
                                                                      {col.ModuleType}
                                                                    </span>
                                                                    {col.Occupied === false && (
                                                                      <div className="DIN-table-circle"></div>
                                                                    )}
                                                                  </td>
                                                                );
                                                              }
                                                            )}
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="row reportWrapperWidth">
                          {reportData.ModuleOutputNo === '1' && !reportData.IsSplitterOutput && (
                            <div className="dmx-report-module-image">
                              <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <span className="LDR-PWD-Heading">
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                              </div>
                              <div className="row col col-lg-12 DIN-DGL-DMX-OUT-DynmicText">
                                <span className="col col-lg-6 DynmicText-DMX1-Left">
                                  {reportData.ModuleName} (DMX 1){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                                <span className="col col-lg-6 DynmicText-DMX2-Right">
                                  {reportData.ModuleName} (DMX 2){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                              </div>
                              <img
                                src={`${LDRReportImageURL}DIN-GWDL-Wiring.svg`}
                                alt="DIN-GWDL-Wiring"
                                style={{ width: '900px', height: 'auto' }}
                              />
                            </div>
                          )}
                          {reportData.ModuleOutputNo === '1' && reportData.IsSplitterOutput && (
                            <div className="dmx-report-module-image">
                              <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <span className="LDR-PWD-Heading">
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                              </div>
                              <div className="row col col-lg-12 DIN-GWDL-SPLTR-DMX-OUT-DynmicText">
                                <span className="col col-lg-6 DIN-GWDL-SPLTR-OUT2">
                                  {reportData.ModuleName} (OUT 2){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                                <span className="col col-lg-6 DIN-GWDL-SPLTR-OUT3">
                                  {reportData.ModuleName} (OUT 3){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                              </div>
                              <div className="row col col-lg-12 DIN-GWDL-SPLTR-DMX-OUT-DynmicText1">
                                <span className="col col-lg-6 DIN-GWDL-SPLTR-OUT1">
                                  {reportData.ModuleName} (OUT 1){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                                <span className="col col-lg-6 DIN-GWDL-SPLTR-OUT4">
                                  {reportData.ModuleName} (OUT 4){' '}
                                  {t('chc_report_PanelWiringDiagram_span')}
                                </span>
                              </div>

                              <img
                                src={`${LDRReportImageURL}DIN-GWDL-SPLT-Wiring.svg`}
                                alt="LDRReportImageURLDIN-GWDL-SPLT-Wiring"
                                style={{ width: '900px', height: 'auto' }}
                              />
                              {reportData.ParentIsSplitter && (
                                <div className="col col-lg-6 CommonFeed-textWrapper">
                                  <span className="col col-lg-12 spliter-CommonFeed-text">
                                    {' '}
                                    Feed from {reportData.ParentModuleName} (OUT{' '}
                                    {reportData.ParentOutputNumber})
                                  </span>
                                </div>
                              )}
                              {!reportData.ParentIsSplitter && (
                                <div className="col col-lg-6 CommonFeed-textWrapper">
                                  <span className="col col-lg-12 spliter-CommonFeed-text">
                                    {' '}
                                    Feed from {reportData.ParentModuleName} (DMX{' '}
                                    {reportData.ParentOutputNumber})
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="LDR-Divider-Line col-lg-12 col-xs-12"> </div>
                          <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {!reportData.IsSplitterOutput && (
                              <span className="LDR-PWD-Heading">
                                {reportData.ModuleName} (DMX {reportData.ModuleOutputNo}){' '}
                                {t('chc_report_PanelWiringDiagram_span')}
                              </span>
                            )}
                            {reportData.IsSplitterOutput && (
                              <span className="LDR-PWD-Heading">
                                {reportData.ModuleName} (OUT {reportData.ModuleOutputNo}){' '}
                                {t('chc_report_PanelWiringDiagram_span')}
                              </span>
                            )}
                          </div>
                          <div className="col col-lg-12 row" style={{ marginTop: '10px' }}>
                            {/*  modules */}
                            {reportData.DmxReportRowDataList.map((rowData: any, key2: any) => {
                              var evenRow = key2 % 2 === 0;
                              return (
                                <div
                                  key={key2}
                                  className={
                                    key2 > 0 ? 'col col-lg-2 reapetDeviceRow' : 'col col-lg-2'
                                  }>
                                  {rowData.NoOfDevicesLeft.map((nonDevice: any, key3: any) => {
                                    const isDMXSplitterOutput =
                                      rowData.DmxReportDataList[key3]?.IsDMXSplitterOutput;
                                    if (key2 % 2 > 0) {
                                      return (
                                        <div
                                          key={key3}
                                          style={{ display: 'none' }}
                                          className={
                                            'col-lg-2 nonDevice mt-3 DMX-PWR-DeviceOutput RoomOutputGroupSlot-row1 RoomOutputGroupSlot'
                                          }>
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            <span className="DMX-PWR-frRoomName"></span>
                                          </div>
                                          <div className="DMX-PWR-TLBoxRoomnGroupName">
                                            <img
                                              className="DMX-PWR-reportOutPutBox-left"
                                              alt="DMX-PWR-reportOutPutBox-left"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                            <img
                                              className="crestronLogo"
                                              alt="crestronLogo"
                                              src={`${LDRReportImageURL}reportCrestronLogo.png`}
                                            />
                                            <img
                                              className="DMX-PWR-reportOutPutBox-right"
                                              alt="DMX-PWR-reportOutPutBox-right"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                          </div>
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            <span className="DMX-PWR-GroupName-SerialName"></span>
                                            <span className="DMX-PWR-GroupName-SerialName"></span>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                  {rowData.DmxReportDataList.map((device: any, key2: any) => {
                                    var evenRow = key2 % 2 === 0;

                                    return (
                                      <div
                                        key={key2}
                                        className={getClasses({
                                          'col-lg-2 mt-3': true,
                                          'DMX-PWR-DeviceOutput': device.IsDMXSplitterOutput,
                                          'RoomOutputGroupSlot-row1':
                                            !device.IsDMXSplitterOutput && evenRow,
                                          RoomOutputGroupSlot:
                                            !device.IsDMXSplitterOutput && !evenRow
                                        })}>
                                        {device.IsDMXSplitterOutput && !device.IsSplitterOutput ? (
                                          <span className="DMX-PWR-DeviceOutputSpanText">
                                            {device.ModuleName} : DMX {device.ModuleOutputNumber}
                                          </span>
                                        ) : (
                                          <span className="DMX-PWR-DeviceOutputSpanText">
                                            {device.ModuleName} : OUT {device.ModuleOutputNumber}
                                          </span>
                                        )}
                                        {!device.IsDMXSplitterOutput && (
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            {device.IsSplitter ? (
                                              <span className="DMX-PWR-frRoomName">
                                                {device.ModuleName}
                                              </span>
                                            ) : (
                                              <>
                                                <span className="DMX-PWR-frRoomName">
                                                  {device.RoomName}
                                                </span>
                                                <span
                                                  className="DMX-PWR-frRoomName"
                                                  style={{
                                                    fontWeight: 'normal',
                                                    color: '#4c4c4c'
                                                  }}>
                                                  {device.LoadGroupName}
                                                </span>
                                                <span
                                                  className="DMX-PWR-frRoomName"
                                                  style={{
                                                    fontWeight: 'normal',
                                                    color: '#4c4c4c'
                                                  }}>
                                                  {device.FixtureTypeName}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        )}
                                        {!device.IsDMXSplitterOutput && !device.IsSplitter ? (
                                          <div className="DMX-PWR-TLBoxRoomnGroupName">
                                            <img
                                              className="DMX-PWR-reportOutPutBox-left"
                                              alt="DMX-PWR-reportOutPutBox-left"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                            <img
                                              className="crestronLogo"
                                              alt="crestronLogo"
                                              src={`${LDRReportImageURL}reportCrestronLogo.png`}
                                            />
                                            <img
                                              className="DMX-PWR-reportOutPutBox-right"
                                              alt="DMX-PWR-reportOutPutBox-right"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                          </div>
                                        ) : (
                                          <div
                                            className="DMX-PWR-TLBoxRoomnGroupName"
                                            style={{ backgroundColor: '#000000' }}>
                                            <img
                                              className="DMX-PWR-reportOutPutBox-left"
                                              alt="DMX-PWR-reportOutPutBox-left"
                                              src={`${LDRReportImageURL}reportOutPutBoxWhite.png`}
                                            />
                                            <img
                                              className="crestronLogo"
                                              alt="crestronLogo"
                                              src={`${LDRReportImageURL}reportCrestronSpliterWhite.png`}
                                            />
                                            <img
                                              className="DMX-PWR-reportOutPutBox-right"
                                              alt="DMX-PWR-reportOutPutBox-right"
                                              src={`${LDRReportImageURL}reportOutPutBoxWhite.png`}
                                            />
                                          </div>
                                        )}
                                        {!device.IsDMXSplitterOutput && (
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            {!device.IsSplitter && (
                                              <span className="DMX-PWR-GroupName-SerialName">
                                                {device.FixtureName}
                                              </span>
                                            )}
                                            <span className="DMX-PWR-GroupName-SerialName">
                                              {device.SerialNumber}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                  {rowData.NoOfDevicesLeft.map((device: any, key2: any) => {
                                    var evenRow = key2 % 2 === 0;
                                    const isDMXSplitterOutput =
                                      rowData.DmxReportDataList[key2]?.IsDMXSplitterOutput;

                                    if (key2 % 2 === 0) {
                                      return (
                                        <div
                                          key={key2}
                                          style={{ display: 'none' }}
                                          className={getClasses({
                                            'col-lg-2 nonDevice mt-3': true,
                                            'DMX-PWR-DeviceOutput': isDMXSplitterOutput,
                                            'RoomOutputGroupSlot-row1':
                                              !isDMXSplitterOutput && evenRow,
                                            RoomOutputGroupSlot: !isDMXSplitterOutput && !evenRow
                                          })}>
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            <span className="DMX-PWR-frRoomName"></span>
                                          </div>
                                          <div className="DMX-PWR-TLBoxRoomnGroupName">
                                            <img
                                              className="DMX-PWR-reportOutPutBox-left"
                                              alt="DMX-PWR-reportOutPutBox-left"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                            <img
                                              className="crestronLogo"
                                              alt="crestronLogo"
                                              src={`${LDRReportImageURL}reportCrestronLogo.png`}
                                            />
                                            <img
                                              className="DMX-PWR-reportOutPutBox-right"
                                              alt="DMX-PWR-reportOutPutBox-right"
                                              src={`${LDRReportImageURL}reportOutPutBoxBlack.png`}
                                            />
                                          </div>
                                          <div className="DMX-PWR-friendlyRoomGroupName">
                                            <span className="DMX-PWR-GroupName-SerialName"></span>
                                            <span className="DMX-PWR-GroupName-SerialName"></span>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return null;
                                  })}
                                </div>
                              );
                            })}

                            {/* modules */}
                            <div className="col col-lg-10 DMX-PWR-timlineDivWrap">
                              {reportData.NoOfRow === 1 && !reportData.LastDeviceIsSplitter && (
                                <div
                                  className={getClasses({
                                    'DMX-PWR-DivBox-SingleRow-empty':
                                      reportData.NoOfLastRowDevices === 1,
                                    'DMX-PWR-DivBox-SingleRow-one':
                                      reportData.NoOfLastRowDevices === 2,
                                    'DMX-PWR-DivBox-SingleRow-two':
                                      reportData.NoOfLastRowDevices === 3,
                                    'DMX-PWR-DivBox-SingleRow-three':
                                      reportData.NoOfLastRowDevices === 4,
                                    'DMX-PWR-DivBox-SingleRow-full':
                                      reportData.NoOfLastRowDevices === 5
                                  })}></div>
                              )}
                              {reportData.NoOfRow === 1 && reportData.LastDeviceIsSplitter && (
                                <div
                                  className={getClasses({
                                    'DMX-PWR-DivBox-SingleRow-one-right-terminated':
                                      reportData.NoOfLastRowDevices === 2,
                                    'DMX-PWR-DivBox-SingleRow-two-right-terminated':
                                      reportData.NoOfLastRowDevices === 3,
                                    'DMX-PWR-DivBox-SingleRow-three-right-terminated':
                                      reportData.NoOfLastRowDevices === 4,
                                    'DMX-PWR-DivBox-SingleRow-four-right-terminated':
                                      reportData.NoOfLastRowDevices === 5
                                  })}></div>
                              )}
                              {reportData.NoOfRow === 1 && !reportData.LastDeviceIsSplitter && (
                                <div
                                  className={getClasses({
                                    'continueArrow-SingleRow-one-right':
                                      reportData.NoOfLastRowDevices === 1,
                                    'StopSquare-SingleRow-two-right':
                                      reportData.NoOfLastRowDevices === 2,
                                    'StopSquare-SingleRow-three-right':
                                      reportData.NoOfLastRowDevices === 3,
                                    'StopSquare-SingleRow-four-right':
                                      reportData.NoOfLastRowDevices === 4,
                                    'StopSquare-SingleRow-five-right':
                                      reportData.NoOfLastRowDevices === 5
                                  })}>
                                  {reportData.NoOfLastRowDevices > 1 && (
                                    <span className="Terminated-Text-right">Terminated</span>
                                  )}
                                </div>
                              )}
                              {reportData.NoOfRow > 1 && <div className="timlineDivBox"></div>}
                              {reportData.NoOfBox.map((box: any, key2: any) => {
                                var even = key2 % 2 === 0;
                                var odd = key2 % 2 !== 0;
                                return (
                                  <div
                                    key={key2}
                                    className={getClasses({
                                      'DMX-PWR-timlineDivBox-one':
                                        reportData.NoOfLastRowDevices === 1 && even,
                                      'DMX-PWR-timlineDivBox-two':
                                        reportData.NoOfLastRowDevices === 2 && even,
                                      'DMX-PWR-timlineDivBox-three-left':
                                        reportData.NoOfLastRowDevices === 3 && even,
                                      'DMX-PWR-timlineDivBox-four-left':
                                        reportData.NoOfLastRowDevices === 4 && even,
                                      'DMX-PWR-timlineDivBox-full':
                                        reportData.NoOfLastRowDevices === 5 && even,
                                      'DMX-PWR-timlineDivBox-one-right':
                                        reportData.NoOfLastRowDevices === 1 && odd,
                                      'DMX-PWR-timlineDivBox-two-right':
                                        reportData.NoOfLastRowDevices === 2 && odd,
                                      'DMX-PWR-timlineDivBox-three-right':
                                        reportData.NoOfLastRowDevices === 3 && odd,
                                      'DMX-PWR-timlineDivBox-four-right':
                                        reportData.NoOfLastRowDevices === 4 && odd,
                                      'DMX-PWR-timlineDivBox-five-right':
                                        reportData.NoOfLastRowDevices === 5 && odd
                                    })}></div>
                                );
                              })}
                              {reportData.NoOfBox.map((box: any, key2: any) => {
                                var even = key2 % 2 === 0;
                                var odd = key2 % 2 !== 0;
                                if (reportData.NoOfRow > 1 && reportData.LastDeviceIsSplitter) {
                                  return (
                                    <div
                                      key={key2}
                                      className={getClasses({
                                        'DMX-PWR-timlineDivBox-one-left-terminated':
                                          reportData.NoOfLastRowDevices === 1 && even,
                                        'DMX-PWR-timlineDivBox-two-left-terminated':
                                          reportData.NoOfLastRowDevices === 2 && even,
                                        'DMX-PWR-timlineDivBox-three-left-terminated':
                                          reportData.NoOfLastRowDevices === 3 && even,
                                        'DMX-PWR-timlineDivBox-four-left-terminated':
                                          reportData.NoOfLastRowDevices === 4 && even,
                                        'DMX-PWR-timlineDivBox-five-left-terminated':
                                          reportData.NoOfLastRowDevices === 5 && even,
                                        'DMX-PWR-timlineDivBox-one-right-terminated':
                                          reportData.NoOfLastRowDevices === 1 && odd,
                                        'DMX-PWR-timlineDivBox-two-right-terminated':
                                          reportData.NoOfLastRowDevices === 2 && odd,
                                        'DMX-PWR-timlineDivBox-three-right-terminated':
                                          reportData.NoOfLastRowDevices === 3 && odd,
                                        'DMX-PWR-timlineDivBox-four-right-terminated':
                                          reportData.NoOfLastRowDevices === 4 && odd,
                                        'DMX-PWR-timlineDivBox-five-right-terminated':
                                          reportData.NoOfLastRowDevices === 5 && odd
                                      })}></div>
                                  );
                                }
                                return null;
                              })}
                              {reportData.NoOfBox.map((box: any, key2: any) => {
                                var even = key2 % 2 === 0;
                                var odd = key2 % 2 !== 0;
                                if (reportData.NoOfRow > 1 && !reportData.LastDeviceIsSplitter) {
                                  return (
                                    <div
                                      key={key2}
                                      className={getClasses({
                                        'StopSquare-one-left':
                                          reportData.NoOfLastRowDevices === 1 && even,
                                        'StopSquare-two-left':
                                          reportData.NoOfLastRowDevices === 2 && even,
                                        'StopSquare-three-left':
                                          reportData.NoOfLastRowDevices === 3 && even,
                                        'StopSquare-four-left':
                                          reportData.NoOfLastRowDevices === 4 && even,
                                        'StopSquare-five-left':
                                          reportData.NoOfLastRowDevices === 5 && even,
                                        'StopSquare-one-right':
                                          reportData.NoOfLastRowDevices === 1 && odd,
                                        'StopSquare-two-right':
                                          reportData.NoOfLastRowDevices === 2 && odd,
                                        'StopSquare-three-right':
                                          reportData.NoOfLastRowDevices === 3 && odd,
                                        'StopSquare-four-right':
                                          reportData.NoOfLastRowDevices === 4 && odd,
                                        'StopSquare-five-right':
                                          reportData.NoOfLastRowDevices === 5 && odd
                                      })}>
                                      <span className="Terminated-Text-right">Terminated</span>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* <div className="pdf-page col-md-12 col-sm-12 col-lg-12 " id="DmxReportPDFExport">
                            <div className="pdf-header row" style={{ marginBottom: "15px" }}>
                                <div className="col col-lg-6 col-md-6 col-sm-6">
                                    <img className="invoice-number" style={{ marginLeft: "25px" }} id="dmxPDFReportLogo" alt="dmxPDFReportLogo" src={`${LDRReportImageURL}crestron-logo-blacknew.png`} />
                                </div>

                                <div className="col col-lg-6 col-md-6 col-sm-6" style={{ textAlign: "right" }}>
                                  <span className="Report-header-text" style={{ marginRight: "40px" }}>DMX-C Report</span>
                                </div>
                            </div>
                            <div className="pdf-body row" style={{ fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif" }}>
                                <div className="col col-lg-12" style={{ justifyContent: "center" }}>
                                    <div className="col col-xs-12 col-md-12">
                                        {DMXReportModel.ReportDataPDF?.map((reportData: any, key1: any) => {
                                            return <div key={key1} className="row PDF-reportWrapperWidth">
                                                {reportData.ModuleOutputNo === "1" && !reportData.PreviousPageContinuation &&
                                                    <div className="col col-lg-12 col-md-12 col-sm-12" >
                                                        <div className="chc-report-header-secondary col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                            style={{ marginTop: "5px", paddingLeft: " 0px", paddingRight: " 0px" }}>
                                                            <div className="col col-xs-12 mar-table-top" style={{ paddingLeft: "0px" }}>
                                                                <div style={{ marginTop: "0px" }}>
                                                                    <div className="col col-xs-6" style={{ paddingRight: " 0px" }}>
                                                                        <span style={{ fontWeight: "bold", fontSize: "17px", color: "#1F1F1F" }}>{reportData.HeaderModuleName}</span>
                                                                    </div>
                                                                    <div className="col col-xs-6" style={{ paddingRight: " 0px", paddingLeft: " 0px" }}>
                                                                        <div className="col col-xs-6" style={{ paddingLeft: " 18px" }}>
                                                                            <span className="custom-label" style={{ marginBottom: "0px ", fontWeight: "bold", fontSize: "17px", color: "#1F1F1F", width: "100%" }}>Serial Number:</span>
                                                                        </div>
                                                                        <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                            <span id="mycres-pwr-customeraddress" className="custom-span" style={{ marginBottom: "0px", fontWeight: "bold", fontSize: "17px", color: "#1F1F1F", width: "270px" }}>{reportData.SerialNumber}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col col-xs-12" style={{ paddingLeft: " 0px" }}>
                                                                        <div className="col col-xs-6 col-md-6 reportPDFInfo" style={{ paddingLeft: " 0px" }}>
                                                                            <div className="row form-group" style={{ marginBottom: "0px" }}>
                                                                                <div className="col col-xs-6 col-xs-6 pdf-report-header-DIN-leftside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Room:</label>
                                                                                </div>
                                                                                <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                                    <span id="mycres-pwr-systemname" className="custom-span" style={{ width: "270px", whiteSpace: "nowrap" }}>{reportData.RoomName}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: "0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-leftside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Enclosure:</label>
                                                                                </div>
                                                                                <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                                    <span id="mycres-pwr-customeraddress" className="custom-span" style={{ width: "270px", whiteSpace: "nowrap" }}>{reportData.EnclosureName}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: "0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-leftside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Enclosure Model:</label>
                                                                                </div>
                                                                                <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                                    <span id="mycres-pwr-customeraddress" className="custom-span" style={{ width: "270px" }}>{reportData.EnclosureModel}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: " 0px" }}>
                                                                                <div className="col col-xs-3 pdf-report-header-DIN-leftside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Rail:</label>
                                                                                </div>
                                                                                <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                                    <span id="mycres-pwr-customeraddress" className="custom-span" style={{ width: "270px" }}>{reportData.RailNumber}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: "0px" }}>
                                                                                <div className="col col-xs-3 pdf-report-header-DIN-leftside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Slot(s):</label>
                                                                                </div>
                                                                                <div className="col col-xs-6" style={{ paddingLeft: " 0px" }}>
                                                                                    <span id="mycres-pwr-customeraddress" className="custom-span" style={{ width: "270px" }}>{reportData.DinSlot}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col col-xs-6 col-md-6 reportPDFInfo" style={{ paddingLeft: " 10px" }}>
                                                                            <div className="row form-group" style={{ marginBottom: "0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-rightside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Module Model:</label>
                                                                                </div>
                                                                                <div className="col col-xs-5" style={{ paddingLeft: " 0px" }}>
                                                                                    <span className="custom-span" style={{ width: "270px" }}>{reportData.ModuleTypeName}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: " 0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-rightside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Outputs Used / Total:</label>
                                                                                </div>
                                                                                <div className="col col-xs-5" style={{ paddingLeft: " 0px" }}>
                                                                                    <span className="custom-span" style={{ width: "270px" }}>{reportData.UsedOutputs + ' / ' + reportData.TotalOutputs}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: " 0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-rightside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Channels Used / Remaining:</label>
                                                                                </div>
                                                                                <div className="col col-xs-5" style={{ paddingLeft: " 0px" }}>
                                                                                    <span className="custom-span" style={{ width: "270px" }}>{reportData.ChannelUsed + ' / ' + reportData.ChannelsRemaining}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: " 0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-rightside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Total Fixtures:</label>
                                                                                </div>
                                                                                <div className="col col-xs-5" style={{ paddingLeft: " 0px" }}>
                                                                                    <span className="custom-span" style={{ width: "270px" }}>{reportData.TotalFixtures}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group" style={{ marginBottom: " 0px" }}>
                                                                                <div className="col col-xs-6 pdf-report-header-DIN-rightside">
                                                                                    <label className="custom-label" style={{ width: "100%" }}>Total Wattage:</label>
                                                                                </div>
                                                                                <div className="col col-xs-5" style={{ paddingLeft: " 0px" }}>
                                                                                    <span className="custom-span" style={{ width: "270px" }}>{reportData.TotalWattages}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col col-xs-12">
                                                                        <div className="col col-xs-3 col-md-4 reportPDFInfo" style={{ paddingLeft: " 0px" }} >
                                                                            {this.GetDMXModuleRowAndCol(reportData.RailNumber, reportData.Cols, reportData.SlotNo, reportData.SlotRange, reportData.ModuleTypeName).map((row: any, key2: any) => {
                                                                                return <div key={key2} >
                                                                                    <table>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td className="Header-PWR-tableRailNumber"><span className="Header-PWR-railNumberCircle binding">{row.Row}</span></td>
                                                                                                <td className="HeaderSlotNo-slotCont">
                                                                                                    <div className="Header-PWR-slotNo-Container">
                                                                                                        <table className="Header-PWR-tableSeprate-DIN-slotNo" style={{ border: "1" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    {row.ColumnCount.map((col: any, key3: any) => {
                                                                                                                        return <td key={key3} id={`Enclosure_Layout_Slot_${col.SlotNo}`}
                                                                                                                            className="Header-PWR-DIN-En-slotNo-td"
                                                                                                                            style={col.OccupiedSlot ? { backgroundColor: 'black', color: 'white' } : { backgroundColor: 'none', color: 'black' }}
                                                                                                                        ><span>{col.SlotNo}</span></td>
                                                                                                                    })}
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                    <div className="Header-PWR-DeviceBG-Container" style={{ marginLeft: "auto", marginRight: "auto", width: " max-content" }}>
                                                                                                        <table className="Header-PWR-DeviceBGTable">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td className="Header-PWR-DeviceBGTable-topHeight"></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="Header-PWR-DeviceBGTable-middleHeight"></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="Header-PWR-DeviceBGTable-bottomHeight"></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table className="Header-PWR-tableSeprate">
                                                                                                            <tbody>
                                                                                                                <tr style={{ height: "24px", width: "auto" }}>
                                                                                                                    {row.AssignedColumn.map((col: any, key3: any) => {
                                                                                                                        return <td key={key3} className={!col.Occupied ? 'DIN-table-td' : 'PWR-EditSlotStatus'} style={{ height: "48px", width: `${col.Width}`, textAlign: "center" }}>
                                                                                                                            <span>{col.ModuleType}</span>
                                                                                                                            {col.Occupied === false && <div className="DIN-table-circle"></div>}
                                                                                                                        </td>
                                                                                                                    })}
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    reportData.ModuleOutputNo === "1" && !reportData.IsSplitterOutput && !reportData.PreviousPageContinuation &&
                                                    <div className="PDF-LDR-report-module-image">
                                                        <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <span className="PDF-LDR-PWD-Heading">{t("chc_report_PanelWiringDiagram_span")}</span>
                                                        </div>
                                                        <div className="row col col-lg-12 PDF-DIN-DGL-DMX-OUT-DynmicText">
                                                            <span className="col col-lg-6 PDF-DynmicText-DMX1-Left">{reportData.ModuleName} (DMX 1) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                            <span className="col col-lg-6 PDF-DynmicText-DMX2-Right">{reportData.ModuleName} (DMX 2) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                        </div>
                                                        <img src={`${LDRReportImageURL}DIN-GWDL-Wiring.png`} alt=" DIN-GWDL-Wiring" style={{ width: "700px", height: "auto", marginLeft: "70px" }} />
                                                        <span className="page-break"></span>
                                                    </div>

                                                }
                                                {reportData.ModuleOutputNo === "1" && reportData.IsSplitterOutput && !reportData.PreviousPageContinuation &&
                                                    <div className="row PDF-LDR-report-module-image">
                                                        <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <span className="PDF-LDR-PWD-Heading">{t("chc_report_PanelWiringDiagram_span")}</span>
                                                        </div>
                                                        <div className=" col col-lg-12 PDF-DIN-GWDL-SPLTR-DMX-OUT-DynmicText1">
                                                            <span className="col col-lg-6 PDF-DIN-GWDL-SPLTR-OUT1">{reportData.ModuleName} (OUT 1) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                            <span className="col col-lg-6 PDF-DIN-GWDL-SPLTR-OUT4">{reportData.ModuleName} (OUT 4) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                        </div>
                                                        <div className=" col col-lg-12 PDF-DIN-GWDL-SPLTR-DMX-OUT-DynmicText">
                                                            <span className="col col-lg-6 PDF-DIN-GWDL-SPLTR-OUT2">{reportData.ModuleName} (OUT 2) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                            <span className="col col-lg-6 PDF-DIN-GWDL-SPLTR-OUT3">{reportData.ModuleName} (OUT 3) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                        </div>
                                                        <img src={`${LDRReportImageURL}DIN-GWDL-SPLT-Wiring.png`} alt="}DIN-GWDL-SPLT-Wiring" style={{ width: "700px", height: "auto", marginLeft: "70px" }} />

                                                        {reportData.ParentIsSplitter &&
                                                            <div className="col col-lg-6 pdf-CommonFeed-textWrapper" >
                                                                <span className="col col-lg-12 PDF-spliter-CommonFeed-text"> Feed from {reportData.ParentModuleName} (OUT {reportData.ParentOutputNumber})</span>
                                                            </div>
                                                        }
                                                        {!reportData.ParentIsSplitter &&
                                                            <div className="col col-lg-6 pdf-CommonFeed-textWrapper" >
                                                                <span className="col col-lg-12 PDF-spliter-CommonFeed-text"> Feed from {reportData.ParentModuleName} (DMX {reportData.ParentOutputNumber})</span>
                                                            </div>
                                                        }
                                                        <span className="page-break"></span>
                                                    </div>
                                                }
                                                <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    {!reportData.IsSplitterOutput && !reportData.PreviousPageContinuation &&
                                                        <span className="PDF-LDR-PWD-Heading" >{reportData.ModuleName} (DMX {reportData.ModuleOutputNo}) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                    }
                                                    {reportData.IsSplitterOutput && !reportData.PreviousPageContinuation &&
                                                        <span className="PDF-LDR-PWD-Heading" >{reportData.ModuleName} (OUT {reportData.ModuleOutputNo}) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                    }
                                                    {!reportData.IsSplitterOutput && reportData.PreviousPageContinuation &&
                                                        <span className="PDF-LDR-PWD-Heading" >***Continued*** {reportData.ModuleName} (DMX {reportData.ModuleOutputNo}) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                    }
                                                    {reportData.IsSplitterOutput && reportData.PreviousPageContinuation &&
                                                        <span className="PDF-LDR-PWD-Heading" >***Continued*** {reportData.ModuleName} (OUT {reportData.ModuleOutputNo}) {t("chc_report_PanelWiringDiagram_span")}</span>
                                                    }
                                                </div>
                                                <div className="col col-lg-12 row" style={{ marginTop: "10px" }}>
                                                    {reportData.DmxReportRowDataList.map((rowData: any, key2: any) => {
                                                        var evenRow = key2 % 2 === 0;
                                                        var rowDataIndex = key2;
                                                        return <div key={key2} className={key2 > 0 ? 'col-lg-2 PDF-LDR-reapetDeviceRow' : "col col-lg-2 "}>
                                                            {rowData.NoOfDevicesLeft.map((device: any, key3: any) => {
                                                                if (rowDataIndex % 2 > 0) {
                                                                    return <div
                                                                        style={{ display:"none" }}
                                                                        key={key3} className={`col-lg-2 mt-3 nonDevice ${rowData.DmxReportDataList[key3]?.IsDMXSplitterOutput ? 'PDF-LDR-DeviceOutput' : evenRow ? 'PDF-LDR-RoomOutputGroupSlot-row1' : 'PDF-LDR-RoomOutputGroupSlot'}`}
                                                                    >
                                                                        <div className="PDF-LDR-friendlyRoomGroupName">
                                                                            <span className="PDF-LDR-frRoomName"></span>
                                                                        </div>
                                                                        <div className="PDF-LDR-TLBoxRoomnGroupName">
                                                                            <img className="PDF-LDR-reportOutPutBox-left" alt="reportOutPutBox-left" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                            <img className="PDF-LDR-crestronLogo" alt="crestronLogo" src={`${LDRReportImageURL}reportCrestronLogo.png`} />
                                                                            <img className="PDF-LDR-reportOutPutBox-right" alt="reportOutPutBox-right" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                        </div>
                                                                        <div className="PDF-LDR-friendlyRoomGroupName">
                                                                            <span className="PDF-LDR-GroupName-SerialName"></span>
                                                                            <span className="PDF-LDR-GroupName-SerialName"></span>
                                                                        </div>
                                                                    </div>
                                                                } else {
                                                                    return <React.Fragment key={key3}></React.Fragment>
                                                                }
                                                            })}
                                                            {rowData.DmxReportDataList.map((device: any, key3: any) => {
                                                                return <div key={key3}
                                                                    className={`col-lg-2 mt-3 ${device.IsDMXSplitterOutput ? 'PDF-LDR-DeviceOutput' : evenRow ? 'PDF-LDR-RoomOutputGroupSlot-row1' : 'PDF-LDR-RoomOutputGroupSlot'}`}
                                                                >
                                                                    {device.IsDMXSplitterOutput && !device.IsSplitterOutput &&
                                                                        <span className="PDF-LDR-DeviceOutputSpanText" >{device.ModuleName} : DMX {device.ModuleOutputNumber}</span>
                                                                    }
                                                                    {device.IsDMXSplitterOutput && device.IsSplitterOutput &&
                                                                        <span className="PDF-LDR-DeviceOutputSpanText" >{device.ModuleName} : OUT {device.ModuleOutputNumber}</span>
                                                                    }
                                                                    {!device.IsDMXSplitterOutput &&
                                                                        <div className="PDF-LDR-friendlyRoomGroupName" >
                                                                            {!device.IsSplitter &&
                                                                                < span className="PDF-LDR-frRoomName" >{device.RoomName}</span>
                                                                            }
                                                                            {!device.IsSplitter &&
                                                                                <span className="PDF-LDR-frRoomName" style={{ fontWeight: "normal", color: "#4c4c4c" }}>{device.LoadGroupName}</span>
                                                                            }
                                                                            {!device.IsSplitter &&
                                                                                <span className="PDF-LDR-frRoomName" style={{ fontWeight: "normal", color: "#4c4c4c" }}>{device.FixtureTypeName}</span>
                                                                            }
                                                                            {device.IsSplitter &&
                                                                                <span className="PDF-LDR-frRoomName" >{device.ModuleName}</span>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {!device.IsDMXSplitterOutput && !device.IsSplitter &&
                                                                        <div className="PDF-LDR-TLBoxRoomnGroupName" >
                                                                            <img className="PDF-LDR-reportOutPutBox-left" alt="reportOutPutBox-left" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                            <img className="PDF-LDR-crestronLogo" alt="crestronLogo" src={`${LDRReportImageURL}reportCrestronLogo.png`} />
                                                                            <img className="PDF-LDR-reportOutPutBox-right" alt="PDF-LDR-reportOutPutBox-right" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                        </div>
                                                                    }
                                                                    {!device.IsDMXSplitterOutput && device.IsSplitter &&
                                                                        <div className="PDF-LDR-TLBoxRoomnGroupName" style={{ backgroundColor: "#000000" }}>
                                                                            <img className="PDF-LDR-reportOutPutBox-left" alt="reportOutPutBox-left" src={`${LDRReportImageURL}reportOutPutBoxWhite.png`} />
                                                                            <img className="PDF-LDR-crestronLogo" alt="crestronLogo" src={`${LDRReportImageURL}reportCrestronSpliterWhite.png`} />
                                                                            <img className="PDF-LDR-reportOutPutBox-right" alt="PDF-LDR-reportOutPutBox-right" src={`${LDRReportImageURL}reportOutPutBoxWhite.png`} />
                                                                        </div>
                                                                    }
                                                                    {!device.IsDMXSplitterOutput &&
                                                                        <div className="PDF-LDR-friendlyRoomGroupName" >
                                                                            {!device.IsSplitter && <span className="PDF-LDR-GroupName-SerialName" >{device.FixtureName}</span>}
                                                                            <span className="PDF-LDR-GroupName-SerialName">{device.SerialNumber}</span>
                                                                        </div>
                                                                    }
                                                                    {device.IsDMXSplitterOutput && reportData.PreviousPageContinuation &&
                                                                        <div className="PDF-LDR-OutPut-ContinuedText" >
                                                                            <span className="PDF-LDR-ContinuedSpan">***Continued***</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            })}
                                                            {rowData.NoOfDevicesLeft.map((device: any, key3: any) => {
                                                                if (rowDataIndex % 2 === 0) {
                                                                    return <div
                                                                        style={{ display:"none" }}
                                                                        key={key3} className={`col-lg-2 mt-3 nonDevice ${rowData.DmxReportDataList[key3]?.IsDMXSplitterOutput ? 'PDF-LDR-DeviceOutput' : evenRow ? 'PDF-LDR-RoomOutputGroupSlot-row1' : 'PDF-LDR-RoomOutputGroupSlot'}`}
                                                                    >
                                                                        <div className="PDF-LDR-friendlyRoomGroupName">
                                                                            <span className="PDF-LDR-frRoomName"></span>
                                                                        </div>
                                                                        <div className="PDF-LDR-TLBoxRoomnGroupName">
                                                                            <img className="PDF-LDR-reportOutPutBox-left" alt="reportOutPutBox-left" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                            <img className="PDF-LDR-crestronLogo" alt="crestronLogo" src={`${LDRReportImageURL}reportCrestronLogo.png`} />
                                                                            <img className="PDF-LDR-reportOutPutBox-right" alt="PDF-LDR-reportOutPutBox-right" src={`${LDRReportImageURL}reportOutPutBoxBlack.png`} />
                                                                        </div>
                                                                        <div className="PDF-LDR-friendlyRoomGroupName">
                                                                            <span className="PDF-LDR-GroupName-SerialName"></span>
                                                                            <span className="PDF-LDR-GroupName-SerialName"></span>
                                                                        </div>
                                                                    </div>
                                                                } else {
                                                                    return <React.Fragment key={key3}></React.Fragment>
                                                                }
                                                            })}
                                                        </div>

                                                    })}
                                                    <div className="col col-lg-9 PDF-LDR-timlineDivWrap">
                                                        {reportData.NoOfRow === 1 && !reportData.LastDeviceIsSplitter &&
                                                            <div className={reportData.NoOfLastRowDevices === 1 ? 'PDF-LDR-DivBox-SingleRow-empty' :
                                                                reportData.NoOfLastRowDevices === 2 ? 'PDF-LDR-DivBox-SingleRow-one' :
                                                                    reportData.NoOfLastRowDevices === 3 ? 'PDF-LDR-DivBox-SingleRow-two' :
                                                                        reportData.NoOfLastRowDevices === 4 ? 'PDF-LDR-DivBox-SingleRow-three' :
                                                                            reportData.NoOfLastRowDevices === 5 ? 'PDF-LDR-DivBox-SingleRow-full' : ""}
                                                            >
                                                            </div>
                                                        }
                                                        {
                                                            reportData.NoOfRow === 1 && reportData.LastDeviceIsSplitter &&
                                                            <div className={reportData.NoOfLastRowDevices === 2 ? 'PDF-LDR-DivBox-SingleRow-one-right-terminated' :
                                                                reportData.NoOfLastRowDevices === 3 ? 'PDF-LDR-DivBox-SingleRow-two-right-terminated' :
                                                                    reportData.NoOfLastRowDevices === 4 ? 'PDF-LDR-DivBox-SingleRow-three-right-terminated' :
                                                                        reportData.NoOfLastRowDevices === 5 ? 'PDF-LDR-DivBox-SingleRow-four-right-terminated' : ""}
                                                            >
                                                            </div>
                                                        }
                                                        {reportData.NoOfRow === 1 && !reportData.LastDeviceIsSplitter &&
                                                            <div className={reportData.NoOfLastRowDevices === 1 ? 'PDF-LDR-continueArrow-SingleRow-one-right' :
                                                                reportData.NoOfLastRowDevices === 2 ? 'PDF-LDR-StopSquare-SingleRow-two-right' :
                                                                    reportData.NoOfLastRowDevices === 3 ? 'PDF-LDR-StopSquare-SingleRow-three-right' :
                                                                        reportData.NoOfLastRowDevices === 4 ? 'PDF-LDR-StopSquare-SingleRow-four-right' :
                                                                            reportData.NoOfLastRowDevices === 5 ? 'PDF-LDR-StopSquare-SingleRow-five-right' : ""}
                                                            >
                                                                {reportData.NoOfLastRowDevices > 1 && <span className="PDF-Terminated-Text-right" >Terminated</span>}
                                                            </div>
                                                        }
                                                        {reportData.NoOfBox.map((box: any, key3: any) => {
                                                            if (reportData.NoOfRow > 1) {
                                                                return <div key={key3} className="PDF-LDR-timlineDivBox" ></div>
                                                            } else {
                                                                return <React.Fragment key={key3}></React.Fragment>
                                                            }
                                                        })}
                                                        {reportData.NoOfBox.map((box: any, key3: any) => {
                                                            var even = key3 % 2 === 0;
                                                            var odd = key3 % 2 !== 0;
                                                            if (reportData.NoOfRow > 1 && !reportData.LastDeviceIsSplitter) {
                                                                return <div key={key3} className={
                                                                    reportData.NoOfLastRowDevices === 1 && even ? 'PDF-LDR-timlineDivBox-one' :
                                                                        reportData.NoOfLastRowDevices === 2 && even ? 'PDF-LDR-timlineDivBox-two' :
                                                                            reportData.NoOfLastRowDevices === 3 && even ? 'PDF-LDR-timlineDivBox-three-left' :
                                                                                reportData.NoOfLastRowDevices === 4 && even ? 'PDF-LDR-timlineDivBox-four-left' :
                                                                                    reportData.NoOfLastRowDevices === 5 && even ? 'PDF-LDR-timlineDivBox-full' :
                                                                                        reportData.NoOfLastRowDevices === 1 && odd ? 'PDF-LDR-timlineDivBox-one-right' :
                                                                                            reportData.NoOfLastRowDevices === 2 && odd ? 'PDF-LDR-timlineDivBox-two-right' :
                                                                                                reportData.NoOfLastRowDevices === 3 && odd ? 'PDF-LDR-timlineDivBox-three-right' :
                                                                                                    reportData.NoOfLastRowDevices === 4 && odd ? 'PDF-LDR-timlineDivBox-four-right' :
                                                                                                        reportData.NoOfLastRowDevices === 5 && odd ? 'PDF-LDR-timlineDivBox-five-right' : ""} ></div>
                                                            } else {
                                                                return <React.Fragment key={key3}></React.Fragment>
                                                            }
                                                        })}
                                                        {reportData.NoOfBox.map((box: any, key3: any) => {
                                                            var even = key3 % 2 === 0;
                                                            var odd = key3 % 2 !== 0;
                                                            if (reportData.NoOfRow > 1 && !reportData.LastDeviceIsSplitter) {
                                                                return <div key={key3} className={
                                                                    reportData.NoOfLastRowDevices === 1 && even ? 'PDF-LDR-timlineDivBox-one-terminated' :
                                                                        reportData.NoOfLastRowDevices === 2 && even ? 'PDF-LDR-timlineDivBox-two-terminated' :
                                                                            reportData.NoOfLastRowDevices === 3 && even ? 'PDF-LDR-timlineDivBox-three-left-terminated' :
                                                                                reportData.NoOfLastRowDevices === 4 && even ? 'PDF-LDR-timlineDivBox-four-left-terminated' :
                                                                                    reportData.NoOfLastRowDevices === 5 && even ? 'PDF-LDR-timlineDivBox-five-left-terminated' :
                                                                                        reportData.NoOfLastRowDevices === 1 && odd ? 'PDF-LDR-timlineDivBox-one-right-terminated' :
                                                                                            reportData.NoOfLastRowDevices === 2 && odd ? 'PDF-LDR-timlineDivBox-two-right-terminated' :
                                                                                                reportData.NoOfLastRowDevices === 3 && odd ? 'PDF-LDR-timlineDivBox-three-right-terminated' :
                                                                                                    reportData.NoOfLastRowDevices === 4 && odd ? 'PDF-LDR-timlineDivBox-four-right-terminated' :
                                                                                                        reportData.NoOfLastRowDevices === 5 && odd ? 'PDF-LDR-timlineDivBox-five-right-terminated' : ""} ></div>
                                                            } else {
                                                                return <React.Fragment key={key3}></React.Fragment>
                                                            }
                                                        })}
                                                        {reportData.NoOfBox.map((box: any, key3: any) => {
                                                            var even = key3 % 2 === 0;
                                                            var odd = key3 % 2 !== 0;
                                                            if (reportData.NoOfRow > 1 && !reportData.ContinueNextPage && !reportData.LastDeviceIsSplitter) {
                                                                return <div className={
                                                                    reportData.NoOfLastRowDevices === 1 && even ? 'PDF-LDR-StopSquare-one-left' :
                                                                        reportData.NoOfLastRowDevices === 2 && even ? 'PDF-LDR-StopSquare-two-left' :
                                                                            reportData.NoOfLastRowDevices === 3 && even ? 'PDF-LDR-StopSquare-three-left' :
                                                                                reportData.NoOfLastRowDevices === 4 && even ? 'PDF-LDR-StopSquare-four-left' :
                                                                                    reportData.NoOfLastRowDevices === 5 && even ? 'PDF-LDR-StopSquare-five-left' :
                                                                                        reportData.NoOfLastRowDevices === 1 && odd ? 'PDF-LDR-StopSquare-one-right' :
                                                                                            reportData.NoOfLastRowDevices === 2 && odd ? 'PDF-LDR-StopSquare-two-right' :
                                                                                                reportData.NoOfLastRowDevices === 3 && odd ? 'PDF-LDR-StopSquare-three-right' :
                                                                                                    reportData.NoOfLastRowDevices === 4 && odd ? 'PDF-LDR-StopSquare-four-right' :
                                                                                                        reportData.NoOfLastRowDevices === 5 && odd ? 'PDF-LDR-StopSquare-five-right' : ""} >
                                                                    <span className="PDF-Terminated-Text-right">Terminated</span>

                                                                </div>
                                                            } else {
                                                                return <React.Fragment key={key3}></React.Fragment>
                                                            }
                                                        })}
                                                        {reportData.NoOfBox.map((box: any, key3: any) => {
                                                            var even = key3 % 2 === 0;
                                                            if (reportData.NoOfRow > 1 && reportData.ContinueNextPage) {
                                                                return <div
                                                                    className={even ? 'PDF-LDR-continueArrow-SingleRow-five-left' : 'PDF-LDR-continueArrow-SingleRow-five-right'}
                                                                >
                                                                    <span className="PDF-cont-Text">Cont...</span>
                                                                </div>
                                                            } else {
                                                                return <React.Fragment key={key3}></React.Fragment>
                                                            }
                                                        })}

                                                    </div>
                                                    <span className={reportData.PageBreak ? 'page-break LDR-Divider-Line' : "LDR-Divider-Line"}></span>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                 */}
        </div>
      </>
    );
  }
}

export default DMXReport;
