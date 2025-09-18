from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import traceback
import io

from agents import analysis_app, report_app, scenario_app, benchmark_app, AgentState
from utils import create_word_report

app = FastAPI(
    title="Saul Goodman: Financial Strategy API",
    description="API for the AI Financial Analyst Agent"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_report_for_display(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        initial_state = AgentState(raw_file_bytes=file_bytes, debate=[], filename=file.filename)
        print("--- Invoking Analysis Workflow for Display ---")
        final_state = analysis_app.invoke(initial_state)
        return JSONResponse(content={
            "company_name": final_state.get('company_name'),
            "debate": final_state.get('debate'),
            "final_summary": final_state.get('final_summary'),
            "extracted_text": final_state.get('extracted_text'),
            "analysis_context": final_state.get('final_summary'),
            "cleaned_data": final_state.get('cleaned_data')
        })
    except Exception as e:
        print(f"ERROR in /analyze: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# --- CHANGE: Simplified ReportRequest to use cleaned_data ---
class ReportRequest(BaseModel):
    company_name: str
    debate: List[str]
    final_summary: str
    cleaned_data: str # Use the KPI data directly

class ScenarioRequest(BaseModel):
    analysis_context: str
    user_query: str
    company_name: str
    cleaned_data: str

class BenchmarkRequest(BaseModel):
    company_name: str
    cleaned_data: str

# --- CHANGE: Overhauled the download endpoint for reliability ---
@app.post("/download_report")
async def download_detailed_report(request: ReportRequest):
    try:
        print("--- Generating Word Report ---")
        
        # We no longer run a separate workflow. We just format the data we already have.
        full_report_data = {
            "debate": request.debate,
            "final_summary": request.final_summary,
            "cleaned_data": request.cleaned_data # Pass the KPIs to the report creator
        }
        
        report_stream = create_word_report(full_report_data, request.company_name)
        
        docx_media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        download_filename = f"Saul_Goodman_Analysis_{request.company_name}.docx"
        
        return StreamingResponse(
            report_stream,
            media_type=docx_media_type,
            headers={"Content-Disposition": f"attachment; filename=\"{download_filename}\""}
        )
    except Exception as e:
        print(f"ERROR in /download_report: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scenario")
async def analyze_scenario(request: ScenarioRequest):
    try:
        initial_state = AgentState(
            analysis_context=request.analysis_context,
            user_query=request.user_query,
            company_name=request.company_name,
            cleaned_data=request.cleaned_data
        )
        print("--- Invoking Scenario Agent ---")
        final_state = scenario_app.invoke(initial_state)
        return {"response": final_state.get('scenario_response', 'Could not process scenario.')}
    except Exception as e:
        print(f"ERROR in /scenario: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/benchmark")
async def analyze_benchmark(request: BenchmarkRequest):
    try:
        initial_state = AgentState(
            company_name=request.company_name,
            cleaned_data=request.cleaned_data
        )
        print("--- Invoking Benchmark Agent ---")
        final_state = benchmark_app.invoke(initial_state)
        return {"response": final_state.get('benchmark_analysis', 'Could not process benchmark analysis.')}
    except Exception as e:
        print(f"ERROR in /benchmark: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))